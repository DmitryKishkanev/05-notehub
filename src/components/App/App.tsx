import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { NoteFormValues } from "@/types/note";
// import { Toaster, toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import NoteForm from "@/components/NoteForm";
import noteService from "@/services";
import SearchBox from "@/components/SearchBox";

import css from "./App.module.css";

function App() {
  const [searchQuery, setSearchQuery] = useState<NoteFormValues>({
    title: "",
    content: "",
    tag: "",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () =>
      noteService.fetchNotes({
        search: searchQuery.search,
        page: currentPage,
        perPage: 12,
      }),

    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((values: NoteFormValues) => {
    (setSearchQuery(values), setCurrentPage(1));
  }, 300);

  const createMutation = useMutation({
    mutationFn: (newNote: NoteFormValues) => noteService.createNote(newNote),
    onSuccess: () => {
      console.log("Todo added successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => noteService.deleteNote(noteId),
    onSuccess: () => {
      console.log("Todo added successfully");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleCreateNote = (values: NoteFormValues) => {
    // вызываем mutate для того чтобы выполнить HTTP-запрос
    createMutation.mutate(values);
  };

  const handleDeleteNote = (id: string) => {
    // вызываем mutate для того чтобы выполнить HTTP-запрос
    deleteMutation.mutate(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox searchQuery={searchQuery} onSearch={updateSearchQuery} />}

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isFetching && <div>Loading posts...</div>}

      {data && <NoteList notes={data.notes} onDelete={handleDeleteNote} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onCreate={handleCreateNote} />
        </Modal>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
