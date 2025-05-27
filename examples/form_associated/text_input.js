import { Wc, Events } from "wctk";

/*
	Form associated custom element.
*/
class TextInput extends HTMLElement {
	static formAssociated = true;

	#wc = new Wc({ host: this });

	#ev = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		connected: true,
		callbacks: [["change", this.#changeHandler]],
	});

	#changeHandler(e) {
		this.#wc.setFormValue(e.target.value);
	}

	// lifecycle method
	formStateRestoreCallback(state) {
		this.#wc.shadowRoot.querySelector("input").value = state;
	}
}

customElements.define("text-input", TextInput);
