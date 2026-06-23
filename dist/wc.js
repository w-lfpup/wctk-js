const shadowRootInitFallback = {
    mode: "closed",
};
export class Wc {
    #declarative = false;
    #internals;
    #shadowRoot;
    constructor(params) {
        let { adoptedStyleSheets, host, formState, formValue, shadowRootInit } = params;
        this.#internals = host.attachInternals();
        this.#declarative = null !== this.#internals.shadowRoot;
        this.#shadowRoot =
            this.#internals.shadowRoot ??
                host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
        this.adoptedStyleSheets = adoptedStyleSheets ?? [];
        if (formValue)
            this.setFormValue(formValue, formState);
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#shadowRoot;
    }
    get adoptedStyleSheets() {
        return this.#shadowRoot.adoptedStyleSheets ?? [];
    }
    set adoptedStyleSheets(stylesheets) {
        this.#shadowRoot.adoptedStyleSheets = stylesheets;
    }
    checkValidity() {
        return this.#internals.checkValidity();
    }
    reportValidity() {
        return this.#internals.reportValidity();
    }
    setFormValue(value, state) {
        this.#internals.setFormValue(value, state);
    }
    setValidity(flags, message, anchor) {
        this.#internals.setValidity(flags, message, anchor);
    }
}
