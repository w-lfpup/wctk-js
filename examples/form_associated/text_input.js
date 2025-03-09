import { Wc, Events } from "wctk";

/*
	Custom Element that particpates in form value submissions.
*/
class TextInput extends HTMLElement {
	static formAssociated = true;

	#wc = new Wc(this);
	#ev = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["change", this.#changeHandler]],
	});

	#changeHandler(e) {
		this.#wc.setFormValue(e.target.value);
	}
}

customElements.define("text-input", TextInput);
