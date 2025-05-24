class QuerySelector {
    #params;
    #queries;
    constructor(params) {
        this.#params = params;
        this.#queries = getQueries(params);
    }
    query() {
        this.#queries = getQueries(this.#params);
    }
    get(name) {
        return this.#queries.get(name)?.[0];
    }
    getAll(name) {
        return this.#queries.get(name);
    }
}
function getQueries(params) {
    const { target, selectors } = params;
    const queries = new Map();
    for (let [name, query] of selectors) {
        const queried = target.querySelectorAll(query);
        queries.set(name, queried);
    }
    return queries;
}
export { QuerySelector };
