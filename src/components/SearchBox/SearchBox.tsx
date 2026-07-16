import type { NoteFormValues } from "@/types/note";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (values: NoteFormValues) => void;
  searchQuery: NoteFormValues;
}

export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchQuery.tag}
      onChange={(e) => onSearch({ ...searchQuery, search: e.target.value })}
    />
  );
}
