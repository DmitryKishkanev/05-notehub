import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
// import { Toaster, toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import NoteForm from "@/components/NoteForm";
// import type { Movie } from "@/types/movie";
// import SearchBar from "@/components/SearchBar";
// import MovieGrid from "@/components/MovieGrid";
// import Loader from "@/components/Loader";
// import ErrorMessage from "@/components/ErrorMessage";
// import MovieModal from "@/components/MovieModal";
// import MovieItem from "@/components/MovieItem";
// import fetchMovies from "@/services";
// import Pagination from "@/components/Pagination";
import fetchNotes from "@/services/noteService";
import css from "./App.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState({});
  const [totalPages, setTotalPages] = useState(5);
  // const [query, setQuery] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);

  const { data: notes, isFetching } = useQuery({
    queryKey: ["notes", searchQuery, totalPages],
    queryFn: () =>
      fetchNotes({
        search: searchQuery.title,
        tag: searchQuery.tag,
        totalPages,
      }),

    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback(
    (values: NoteFormValues) => setSearchQuery(values),
    300,
  );

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //   queryKey: ["movies", query, currentPage],
  //   queryFn: () => fetchMovies({ query, page: currentPage }),
  //   enabled: !!query, // запрос выполняется только если есть строка поиска
  //   placeholderData: keepPreviousData,
  // });

  // const handleSearch = (newQuery: string) => {
  //   setQuery(newQuery);
  //   setCurrentPage(1);
  // };

  // const handleSelect = (movie: Movie) => {
  //   setSelectedMovie(movie);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedMovie(null);
  // };

  // const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>

      <NoteForm onSubmit={updateSearchQuery} />
      {/* <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {isLoading && <Loader message="Loading movies, please wait..." />}

      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}

      {isSuccess && data.movies.length > 0 ? (
        <MovieGrid movies={data.movies} onSelect={handleSelect} />
      ) : (
        isSuccess &&
        toast("No movies found for your request", {
          style: { background: "#a20e0e", color: "#fff" },
        })
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal}>
          <MovieItem movie={selectedMovie} />
        </MovieModal>
      )}

      <Toaster position="top-center" reverseOrder={false} /> */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
