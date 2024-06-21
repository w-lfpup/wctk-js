class Events {
    #connected = false;
    #el;
    #events = [];
    constructor(el, callbacks) {
        this.#el = el;
        for (let [name, cb] of callbacks) {
            let callback = cb;
            if (callback instanceof Function &&
                !callback.hasOwnProperty("prototype")) {
                callback = callback.bind(this.#el);
            }
            this.#events.push([name, callback]);
        }
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        for (let [name, callback] of this.#events) {
            this.#el.addEventListener(name, callback);
        }
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        for (let [name, callback] of this.#events) {
            this.#el.removeEventListener(name, callback);
        }
    }
}

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
    constructor(sr, stylesheetTemplates) {
        this.#root = sr;
        this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
    }
    get adoptedStyleSheets() {
        return this.#root.adoptedStyleSheets;
    }
    set adoptedStyleSheets(stylesheetTemplates) {
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

class Subscription {
    #connected = false;
    #el;
    #affect;
    #onConnect;
    #onDisconnect;
    constructor(el, onConnect, onDisconnect) {
        this.#el = el;
        this.#onConnect = onConnect;
        this.#onDisconnect = onDisconnect;
    }
    connect() {
        if (this.#connected)
            return;
        this.#connected = true;
        this.#affect = this.#onConnect(this.#el);
    }
    disconnect() {
        if (!this.#connected)
            return;
        this.#connected = false;
        this.#onDisconnect(this.#el, this.#affect);
    }
}

export { Events, Render, Shadow, Styles, Subscription };
