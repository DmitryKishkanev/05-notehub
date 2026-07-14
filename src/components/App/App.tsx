import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
// import { Toaster, toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList";
import Pagination from "@/components/Pagination";
import noteService from "@/services/noteService";
import css from "./App.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState<NoteFormValues>({
    title: "",
    content: "",
    tag: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () =>
      noteService.fetchNotes({
        page: currentPage,
        perPage: 12,
      }),

    placeholderData: keepPreviousData,
  });

  // const updateSearchQuery = useDebouncedCallback((values: NoteFormValues) => {
  //   (setSearchQuery(values), setCurrentPage(1));
  // }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {/* <NoteForm onSubmit={updateSearchQuery} /> */}
      {isFetching && <div>Loading posts...</div>}
      {data && <NoteList notes={data.notes} />}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
