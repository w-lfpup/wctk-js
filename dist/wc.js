const shadowRootInit = {
    mode: "closed",
};
class Wc {
    #internals;
    #declarative;
    constructor(el, init = { ...shadowRootInit }) {
        this.#internals = el.attachInternals();
        this.#declarative = this.#internals.shadowRoot !== null;
        if (!this.#declarative) {
            el.attachShadow(init);
        }
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#internals.shadowRoot;
    }
    get adoptedStyleSheets() {
        return this.#internals.shadowRoot.adoptedStyleSheets;
    }
    set adoptedStyleSheets(stylesheets) {
        this.#internals.shadowRoot.adoptedStyleSheets = stylesheets;
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
