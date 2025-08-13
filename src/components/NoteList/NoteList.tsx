import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Note, NoteId } from "../../types/note"
import css from "./NoteList.module.css"
import { deleteNote } from "../../services/noteService"
import toastMessage, { MyToastType } from "../../services/messageService"

interface NoteListProps {
	onSelect: (noteSelected: NoteId) => void
	notes: Note[]
}

export default function NoteList({ notes, onSelect }: NoteListProps) {
	const queryClient = useQueryClient()

	const { mutate: deleteMutation } = useMutation<Note, Error, string>({
		mutationFn: deleteNote,
		onSuccess(note) {
			console.log("deleted")
			toastMessage(MyToastType.success, `Note ${note.title} deleted`)
			queryClient.invalidateQueries({ queryKey: ["notesQuery"] })
		},
		onError() {
			console.log("Error deleting task!!!!")
		},
	})

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const noteSelected: NoteId = e.currentTarget.id as NoteId
		console.log(noteSelected, e.target, e.currentTarget.id)
		const isConfirmed = window.confirm("А ви впевнені, що хочете видалити?")
		if (isConfirmed) {
			console.log("deleted")
		}
		return onSelect(noteSelected)
	}

	return (
		<div>
			<ul className={css.list}>
				{notes.map((item: Note, index: number) => {
					return (
						<li
							key={item.id}
							id={item.id.toString()}
							onClick={handleClick}
							className={css.listItem}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<h2 className={css.title}>{item.title}</h2>
							<p className={css.content}>{item.content}</p>
							<div className={css.footer}>
								<span className={css.tag}>{item.tag}</span>
								<button className={css.button} onClick={() => deleteMutation(item.id)}>
									Delete
								</button>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
