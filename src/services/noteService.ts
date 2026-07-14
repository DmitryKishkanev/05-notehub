import axios from "axios";
import type { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesParams {
  page?: number;
  perPage?: number;
}

interface FetchNotesResult {
  notes: Note[];
  totalPages: number;
}

interface Post {
  title: string;
  content: string;
  tag: string;
}

interface Patch {
  title: string;
  content: string;
  tag: string;
}

// READ: список заметок
async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResult> {
  const response = await axios.get<FetchNotesResult>(`${BASE_URL}/notes`, {
    params,
    headers: { Authorization: `Bearer ${myKey}` },
  });

  const { notes, totalPages } = response.data;
  return {
    notes,
    totalPages,
  };
}

// READ: одна заметка
async function fetchNote(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${myKey}` },
  });
  return response.data;
}

// CREATE: новая заметка
async function createNote(newNote: Post): Promise<Note> {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, newNote, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
}

// UPDATE: обновление заметки
async function updateNote(id: string, patch: Patch): Promise<Note> {
  const response = await axios.patch<Note>(`${BASE_URL}/notes/${id}`, patch, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
}

// DELETE: удаление заметки
async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${myKey}` },
  });
  return response.data;
}

export default { fetchNotes, fetchNote, createNote, updateNote, deleteNote };
