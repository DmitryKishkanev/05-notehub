import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface SearchFormValues {
  query: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: SearchFormValues,
    { resetForm }: FormikHelpers<SearchFormValues>,
  ) => {
    if (values.query.trim() === "") {
      toast("Please enter your search query.", {
        style: {
          background: "#a20e0e",
          color: "#fff",
        },
      });
      return;
    }
    onSubmit(values.query);
    resetForm();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />

            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
