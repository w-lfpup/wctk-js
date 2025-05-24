const shadowRootInitFallback = {
    mode: "closed",
};
class Wc {
    #declarative = true;
    #internals;
    #shadowRoot;
    constructor(params) {
        let { host, shadowRootInit, adoptedStyleSheets, formValue, formState } = params;
        this.#internals = host.attachInternals();
        let { shadowRoot } = this.#internals;
        if (!shadowRoot) {
            this.#declarative = false;
            shadowRoot = host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
        }
        this.#shadowRoot = shadowRoot;
        if (formValue)
            this.setFormValue(formValue, formState);
        if (adoptedStyleSheets)
            this.adoptedStyleSheets = adoptedStyleSheets;
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
export { Wc };
