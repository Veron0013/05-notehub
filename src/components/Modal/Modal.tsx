import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import NoteForm from "../NoteForm/NoteForm"
import { useEffect } from "react"
import type { Note } from "../../types/note"

interface ModalProps {
	noteObject: Note | null
	onClose: () => void
}

export default function Modal({ onClose, noteObject }: ModalProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		document.body.style.overflow = "hidden"

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = ""
		}
	}, [onClose])

	return createPortal(
		<div className={css.backdrop} role="dialog" aria-modal="true">
			<div className={css.modal}>
				<NoteForm onClose={onClose} noteObject={noteObject} />
			</div>
		</div>,
		document.body
	)
}
