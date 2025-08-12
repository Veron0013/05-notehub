import css from "./SearchBox.module.css"

export default function SearchBox() {
	return (
		<div>
			<input className={css.input} type="text" placeholder="Search notes" />
		</div>
	)
}
