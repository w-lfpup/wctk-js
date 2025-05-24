const shadowRootInitFallback = {
    mode: "closed",
};
class Wc {
    #internals;
    #declarative;
    constructor(params) {
        let { host } = params;
        this.#internals = host.attachInternals();
        this.#declarative = null !== this.#internals.shadowRoot;
        if (!this.#declarative) {
            let { shadowRootInit, formValue, formState } = params;
            host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
            if (formValue)
                this.setFormValue(formValue, formState);
        }
        let { adoptedStyleSheets } = params;
        if (adoptedStyleSheets)
            this.adoptedStyleSheets = adoptedStyleSheets;
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#internals.shadowRoot;
    }
    get adoptedStyleSheets() {
        return this.#internals.shadowRoot?.adoptedStyleSheets ?? [];
    }
    set adoptedStyleSheets(stylesheets) {
        let { shadowRoot } = this.#internals;
        if (shadowRoot)
            shadowRoot.adoptedStyleSheets = stylesheets;
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
export { Wc };
