export interface NotesData {
	notes: Note[]
	totalPages: number
}

export interface Note {
	id: string
	title: string
	content?: string
	createdAt?: string
	updatedAt?: string
	tag: string
}

export type NoteId = Note["id"]

export type NotePost = Omit<Note, "id">

export type ConfirmDimentions = {
	top: number
	left: number
	width: number
	height: number
}
