export interface NotesData {
	notes: Note[]
	totalPages: number
}

export interface Note {
	id: string
	title: string
	content: string
	createdAt?: string
	updatedAt?: string
	tag: string
}

export type NoteId = Note["id"]
