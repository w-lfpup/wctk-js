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
    const { target, querySelector, querySelectorAll } = params;
    const queries = new Map();
    if (querySelectorAll)
        for (let selector of querySelectorAll) {
            const queried = target.querySelectorAll(selector);
            queries.set(selector, Array.from(queried));
        }
    if (querySelector)
        for (let selector of querySelector) {
            if (queries.has(selector))
                continue;
            const queried = target.querySelector(selector);
            if (queried)
                queries.set(selector, [queried]);
        }
    return queries;
}
export { QuerySelector };
