import { Wc, Events } from "wctk";

/*
	Form associated custom element.
*/
export class TextInput extends HTMLElement {
	static formAssociated = true;

	#wc = new Wc({ host: this });

	#ev = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		connected: true,
		callbacks: [["change", this.#changeHandler]],
	});

	#changeHandler(e: Event) {
		let { target } = e;
		if (target instanceof HTMLInputElement)
			this.#wc.setFormValue(target.value);
	}

	// lifecycle method
	formStateRestoreCallback(state: string) {
		let input = this.#wc.shadowRoot.querySelector("input")
		if (input) input.value = state;
	}
}
