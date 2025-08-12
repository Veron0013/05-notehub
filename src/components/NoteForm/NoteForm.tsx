import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik"
import { useId } from "react"
import css from "./NoteForm.module.css"
import * as Yup from "yup"
import toastMessage, { MyToastType } from "../../services/messageService"

interface NoteFormProps {
	onClose: () => void
	onSubmit: (queryData: string) => void
}

export default function NoteForm({ onClose, onSubmit }: NoteFormProps) {
	interface NotesFormValues {
		title: string
		content: string
		tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
	}

	const initialValues: NotesFormValues = {
		title: "my first note",
		content: "",
		tag: "Todo",
	}

	const NotesSchema = Yup.object().shape({
		title: Yup.string().min(3, "too small"),
		content: Yup.string().min(3, "too small"),
		tag: Yup.string().min(3, "too small"),
	})

	const handleSubmit = (values: NotesFormValues, formikHelpers: FormikHelpers<NotesFormValues>) => {
		const queryData = values.title.trim()

		formikHelpers.resetForm()
		if (!queryData.trim().length) {
			toastMessage(MyToastType.loading, "translationTexts.toast_no_request")
			return
		}
		onSubmit(queryData)
	}
	const fieldId = useId()

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={NotesSchema} onSubmit={handleSubmit}>
				<Form className={css.form}>
					<div className={css.formGroup}>
						<label htmlFor="title">Title</label>
						<Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
						<ErrorMessage name="title" component="span" className={css.error} />
					</div>

					<div className={css.formGroup}>
						<label htmlFor="content">Content</label>
						<textarea id={`${fieldId}-content`} name="content" rows={8} className={css.textarea} />
						<ErrorMessage name="content" component="span" className={css.error} />
					</div>

					<div className={css.formGroup}>
						<label htmlFor="tag">Tag</label>
						<Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
							<option value="Todo">Todo</option>
							<option value="Work">Work</option>
							<option value="Personal">Personal</option>
							<option value="Meeting">Meeting</option>
							<option value="Shopping">Shopping</option>
						</Field>
						<ErrorMessage name="select" component="span" className={css.error} />
					</div>

					<div className={css.actions}>
						<button type="button" className={css.cancelButton} onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className={css.submitButton} disabled={false}>
							Create note
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	)
}
