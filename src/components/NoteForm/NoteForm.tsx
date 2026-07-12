import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (query: NoteFormValues) => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .required("Name is required"),
  content: Yup.string()
    .min(5, "Message too short")
    .max(300, "Message too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const fieldId = useId();

  const handleSubmit = (
    values: NoteFormValues,
    { resetForm }: FormikHelpers<NoteFormValues>,
  ) => {
    {
      if (values.title.trim()) {
        toast("Please enter a title.", {
          style: {
            background: "#a20e0e",
            color: "#fff",
          },
        });
        return;
      }

      if (values.content.trim()) {
        toast("Please enter content.", {
          style: {
            background: "#a20e0e",
            color: "#fff",
          },
        });
        return;
      }
      onSubmit(values);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="">-- Select the note type --</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

// interface SearchBarProps {
//   onSubmit: (query: string) => void;
// }

// interface SearchFormValues {
//   query: string;
// }

// export default function SearchBar({ onSubmit }: SearchBarProps) {
//   const handleSubmit = (
//     values: SearchFormValues,
//     { resetForm }: FormikHelpers<SearchFormValues>,
//   ) => {
//     if (values.query.trim() === "") {
//       toast("Please enter your search query.", {
//         style: {
//           background: "#a20e0e",
//           color: "#fff",
//         },
//       });
//       return;
//     }
//     onSubmit(values.query);
//     resetForm();
//   };

//   return (
//     <header className={css.header}>
//       <div className={css.container}>
//         <a
//           className={css.link}
//           href="https://www.themoviedb.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by TMDB
//         </a>

//         <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
//           <Form className={css.form}>
//             <Field
//               className={css.input}
//               type="text"
//               name="query"
//               autoComplete="off"
//               placeholder="Search movies..."
//               autoFocus
//             />

//             <button className={css.button} type="submit">
//               Search
//             </button>
//           </Form>
//         </Formik>
//       </div>
//     </header>
//   );
// }
