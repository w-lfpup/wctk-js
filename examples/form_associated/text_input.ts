/*
	Form associated custom element.
*/

import { Wc, Events } from "wctk";

export class TextInput extends HTMLElement {
	static formAssociated = true;

	#wc = new Wc({ host: this });
	#ev = new Events({
		target: this.#wc.shadowRoot,
		connected: true,
		listeners: {
			change: this.#changeHandler.bind(this),
		},
	});

	#changeHandler(event: Event): void {
		let { target } = event;
		if (target instanceof HTMLInputElement)
			this.#wc.setFormValue(target.value);
	}

	// lifecycle method
	formStateRestoreCallback(state: string) {
		let input = this.#wc.shadowRoot.querySelector("input");
		if (input) input.value = state;
	}
}
