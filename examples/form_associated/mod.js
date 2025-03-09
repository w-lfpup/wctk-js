import { Wc, Events } from "wctk";

class TextValue extends HTMLElement {
	static formAssociated = true;

	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["change", this.#changeHandler]],
	});

	#changeHandler(e) {
		this.#wc.setFormValue(e.target.value, e.target.value);
	}
}

customElements.define("text-wc", TextValue);

/*
	FOR DEMO PURPOSES

	prevent form submission and provide results
*/

const results = document.querySelector("[results]");

document.addEventListener("submit", function (e) {
	e.preventDefault();

	if (e.target instanceof HTMLFormElement) {
		let formdata = new FormData(e.target);

		let data = {};
		for (let [name, value] of formdata.entries()) {
			data[name] = value;
		}

		results.textContent = JSON.stringify(data);
	}
});
