import type { Note } from "../../types/note"
import css from "./NoteList.module.css"

interface NoteListProps {
	onSelect: (noteSelected: number) => void
	notes: Note[]
}

export default function NoteList({ notes, onSelect }: NoteListProps) {
	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const noteSelected: number = Number(e.currentTarget.id)
		return onSelect(noteSelected)
	}

	return (
		<div>
			<ul className={css.list}>
				{notes.map((item: Note, index: number) => {
					//console.log(item)
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
								<button className={css.button}>Delete</button>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
