import { Wc, Events } from "wctk";
/*
    Form associated custom element.
*/
export class TextInput extends HTMLElement {
    static formAssociated = true;
    #wc = new Wc({ host: this });
    #ev = new Events({
        host: this,
        connected: true,
        callbacks: [["change", this.#changeHandler]],
    });
    #changeHandler(e) {
        let { target } = e;
        if (target instanceof HTMLInputElement)
            this.#wc.setFormValue(target.value);
    }
    // lifecycle method
    formStateRestoreCallback(state) {
        let input = this.#wc.shadowRoot.querySelector("input");
        if (input)
            input.value = state;
    }
}
