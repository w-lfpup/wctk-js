export class QuerySelector {
    #queries = new Map();
    #queryAlls = new Map();
    #parentNode;
    constructor(parentNode) {
        this.#parentNode = parentNode;
    }
    querySelector(selector) {
        let results = this.#queries.get(selector);
        if (!results) {
            results = this.#parentNode.querySelector(selector) ?? undefined;
            if (results)
                this.#queries.set(selector, results);
        }
        return results;
    }
    querySelectorAll(selector) {
        let results = this.#queryAlls.get(selector);
        if (!results) {
            results = Array.from(this.#parentNode.querySelectorAll(selector));
            this.#queryAlls.set(selector, results);
        }
        return results;
    }
    deleteAll() {
        this.#queries = new Map();
        this.#queryAlls = new Map();
    }
}
