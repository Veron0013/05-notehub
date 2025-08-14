import { useState } from "react"
import css from "./App.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import type { Note, NotesData } from "../../types/note"
import NoteList from "../NoteList/NoteList"
import SearchBox from "../SearchBox/SearchBox"
import Pagination from "../Pagination/Pagination"
import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { createQueryParams, fetchNotes } from "../../services/noteService"
import toastMessage, { MyToastType } from "../../services/messageService"
import { useDebouncedCallback } from "use-debounce"

function App() {
	const [notehubQuery, setNoteHubQuery] = useState("")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [noteObject, setNoteObject] = useState<Note | null>(null)

	const { data, isLoading, isError } = useQuery({
		queryKey: ["notesQuery", notehubQuery, currentPage],
		queryFn: async () => fetchQueryData(),
		placeholderData: keepPreviousData,
	})

	const fetchQueryData = async () => {
		const res: NotesData = await fetchNotes(createQueryParams(notehubQuery, currentPage))
		if (!res.notes.length) {
			toastMessage(MyToastType.error, "No matches on this request. Please try another one")
		}
		setTotalPages(res.totalPages)
		return res
	}

	const debouncedQueryChange = useDebouncedCallback((value: string) => {
		setNoteHubQuery(value)
		setCurrentPage(1)
	}, 300)

	const handleCreateNote = () => {
		setNoteObject(null)
		setIsModalOpen(true)
	}

	const handleNoteClick = (noteObjectOut: Note) => {
		setNoteObject(noteObjectOut)
		openModal()
	}

	const closeModal = () => setIsModalOpen(false)
	const openModal = () => setIsModalOpen(true)

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onQueryChange={debouncedQueryChange} />
				{totalPages > 0 && (
					<Pagination
						currentPage={currentPage}
						total_pages={totalPages}
						setCurrentPage={(newPage: number) => {
							setCurrentPage(newPage)
						}}
					/>
				)}
				<button className={css.button} onClick={handleCreateNote}>
					Create note +
				</button>
			</header>
			{isError && <ErrorMessage />}
			{isLoading && <Loader />}
			{data && data?.notes?.length > 0 && <NoteList notes={data.notes} onSelect={handleNoteClick} />}
			{isModalOpen && <Modal onClose={closeModal} noteObject={noteObject} />}
		</div>
	)
}

export default App
