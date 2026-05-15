import { Wc, Events } from "wctk";
export class TextInput extends HTMLElement {
    static formAssociated = true;
    #wc = new Wc({ host: this });
    #ev = new Events({
        target: this.#wc.shadowRoot,
        connected: true,
        callbacks: {
            change: this.#changeHandler.bind(this),
        },
    });
    #changeHandler(event) {
        let { target } = event;
        if (target instanceof HTMLInputElement)
            this.#wc.setFormValue(target.value);
    }
    formStateRestoreCallback(state) {
        let input = this.#wc.shadowRoot.querySelector("input");
        if (input)
            input.value = state;
    }
}
