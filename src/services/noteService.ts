import axios from "axios";
import type { Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FatchNotesParams {
  search: string;
  tag: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FatchNotesResult {
  notes: Note[];
  totalPages: number;
}
