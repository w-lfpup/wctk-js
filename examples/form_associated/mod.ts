import { TextInput } from "./text_input.js";

customElements.define("text-input", TextInput);

const results = document.querySelector("[results]");

document.addEventListener("submit", function (e: SubmitEvent) {
	if (!(e.target instanceof HTMLFormElement)) return;

	e.preventDefault();

	let formdata: FormData = new FormData(e.target);

	if (results)
		results.textContent = JSON.stringify(
			// TODO: remove expected error when FormData::entries() is included in typescript
			// @ts-expect-error
			Object.fromEntries(formdata),
			undefined,
			" ",
		);
});
