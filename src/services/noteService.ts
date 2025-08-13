import axios from "axios"
import { MAIN_URL, PER_PAGE } from "./vars"
import type { Note, NoteId } from "../types/note"

axios.defaults.baseURL = MAIN_URL
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`

export interface SearchParams {
	search: string
	tag?: string
	page?: number
	perPage?: number
	sortBy?: string
}

interface ApiQueryParams {
	params: SearchParams
}

export const createQueryParams = (search: string | null = null, page: number | null = null): ApiQueryParams => {
	if (search === null || page === null) {
		return { params: { search: "" } }
	}
	return {
		params: {
			search,
			page,
			perPage: PER_PAGE,
		},
	}
}

export const fetchNotes = async <NotesData>(
	queryParams: ApiQueryParams,
	id: NoteId | null = null
): Promise<NotesData> => {
	const url: string = id === null ? MAIN_URL : `${MAIN_URL}/${id}`
	const response = await axios.get<NotesData>(url, queryParams)
	return response.data
}

export const createNote = async (queryParams: ApiQueryParams, id: NoteId | null = null): Promise<Note> => {
	const url: string = id === null ? MAIN_URL : `${MAIN_URL}/${id}`
	const response = await axios.post<Note>(url, queryParams)
	console.log(response.data)
	return response.data
}

export const deleteNote = async (id: NoteId): Promise<Note> => {
	const response = await axios.delete<Note>(`${MAIN_URL}/${id}`)
	return response.data
}
