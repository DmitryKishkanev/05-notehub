import type { Note } from "@/types/note";
// import noImage from "@/assets/no-image.jpg";
import css from "./NoteList.module.css";

interface NoteListProps {
  // onSelect: (movie: Movie) => void;
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// interface MovieGridProps {
//   onSelect: (movie: Movie) => void;
//   movies: Movie[];
// }

// export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
//   return (
//     <ul className={css.grid}>
//       {movies.map((movie) => (
//         <li key={movie.id} onClick={() => onSelect(movie)}>
//           <div className={css.card}>
//             <img
//               className={css.image}
//               src={
//                 movie.poster_path
//                   ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                   : noImage
//               }
//               alt={movie.title}
//               loading="lazy"
//             />
//             <h2 className={css.title}>{movie.title}</h2>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
