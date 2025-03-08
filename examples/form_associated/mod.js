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
		this.#wc.setFormValue(e.target.value, e.tartget.value);
	}
}

customElements.define("text-wc", TextValue);
