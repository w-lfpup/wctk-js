export class QuerySelector {
    #queries = new Map();
    #queryAlls = new Map();
    #parentNode;
    constructor(parentNode) {
        this.#parentNode = parentNode;
    }
    querySelector(selector) {
        if (this.#queries.has(selector))
            return this.#queries.get(selector);
        let query = this.#parentNode.querySelector(selector) ?? undefined;
        this.#queries.set(selector, query);
        return query;
    }
    querySelectorAll(selector) {
        let query = this.#queryAlls.get(selector);
        if (!query) {
            query = Array.from(this.#parentNode.querySelectorAll(selector));
            this.#queryAlls.set(selector, query);
        }
        return query;
    }
    deleteAll() {
        this.#queries = new Map();
        this.#queryAlls = new Map();
    }
}
