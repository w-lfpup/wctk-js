export class QuerySelector {
    #queries = new Map();
    #params;
    constructor(params) {
        this.#params = params;
    }
    querySelector(selector) {
        return getQuery(this.#params, this.#queries, selector)[0];
    }
    querySelectorAll(selector) {
        return getQuery(this.#params, this.#queries, selector);
    }
    deleteAll() {
        this.#queries = new Map();
    }
}
function getQuery(params, queries, selector) {
    const { parent } = params;
    let results = queries.get(selector);
    if (!results) {
        results = Array.from(parent.querySelectorAll(selector));
        queries.set(selector, results);
    }
    return results;
}
