import { createPortal } from "react-dom"
import css from "./ErrorMessage.module.css"
import { ERROR_MAIN_MESSAGE } from "../../services/vars"

export default function ErrorMessage() {
	return createPortal(
		<div>
			<p className={css.text}>{ERROR_MAIN_MESSAGE}</p>
		</div>,
		document.body
	)
}
