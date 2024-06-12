class Render {
    #el;
    #queued = false;
    constructor(el) {
        this.#el = el;
    }
    get queued() {
        return this.#queued;
    }
    render() {
        if (this.#queued)
            return;
        this.#queued = true;
        queueMicrotask(() => {
            this.#queued = false;
            this.#el.render();
        });
    }
}

class Shadow {
    #internals;
    #declarative;
    constructor(el, init) {
        this.#internals = el.attachInternals();
        this.#declarative = this.#internals.shadowRoot !== null;
        if (!this.#declarative) {
            el.attachShadow(init);
        }
    }
    get internals() {
        return this.#internals;
    }
    get declarative() {
        return this.#declarative;
    }
    get shadowRoot() {
        return this.#internals.shadowRoot;
    }
}

class Styles {
    #root;
    constructor(sd, stylesheetTemplates) {
        this.#root = sd;
        this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
    }
    set adoptedStylesheets(stylesheetTemplates) {
        this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
    }
}
function getStylesheets(stylesheetTemplates) {
    let stylesheets = [];
    for (let stylesheetTemplate of stylesheetTemplates) {
        if (stylesheetTemplate instanceof CSSStyleSheet) {
            stylesheets.push(stylesheetTemplate);
        }
        if (typeof stylesheetTemplate === "string") {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(stylesheetTemplate);
            stylesheets.push(sheet);
        }
    }
    return stylesheets;
}

export { Render, Shadow, Styles };
