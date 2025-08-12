import { useEffect, useState } from "react"
import css from "./App.module.css"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import type { Note, NotesData } from "../../types/note"
import NoteList from "../NoteList/NoteList"
import SearchBox from "../SearchBox/SearchBox"
import Pagination from "../Pagination/Pagination"
import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

function App() {
	const [count, setCount] = useState(0)
	const [notehubQuery, setStorageQuery] = useState("")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const [noteObject, setNoteObject] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data, isLoading, isError } = useQuery({
		queryKey: ["searchQuery"],
		queryFn: async () => fetchQueryData(),
		placeholderData: keepPreviousData,
		enabled: notehubQuery !== "",
	})

	const fetchQueryData = async () => {
		setTotalPages(20)
	}

	const handleCreateNote = () => {
		setIsModalOpen(true)
	}

	const handleNoteClick = (noteObject: number) => {
		setNoteObject(noteObject)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const onSubmit = (aData: string) => {
		console.log(aData)
		setIsModalOpen(false)
	}

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox />
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
			{isModalOpen && <Modal onClose={closeModal} onSubmit={onSubmit} />}
		</div>
	)
}

export default App
