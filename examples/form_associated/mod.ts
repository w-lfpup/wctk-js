import { TextInput } from "./text_input.js";

customElements.define("text-input", TextInput);

const results = document.querySelector("[results]");

document.addEventListener("submit", function (e) {
	if (!(e.target instanceof HTMLFormElement)) return;

	e.preventDefault();

	let formdata: FormData = new FormData(e.target);
	let data: Map<string, FormDataEntryValue> = new Map();

	// TODO: remove when FormData::entries() is included in DOM api
	// @ts-expect-error
	for (let [name, value] of formdata.entries()) {
		data.set(name, value);
	}

	if (results) results.textContent = JSON.stringify(data, undefined, " ");
});
