interface QuerySelectorParamsInterface {
	target: Element | ShadowRoot | Document;
	selectors: Array<[string, string]>;
}

interface QuerySelectorInterface {
	query(): void;
	get(name: string): Element | undefined;
	getAll(name: string): NodeListOf<Element> | undefined;
}

class QuerySelector implements QuerySelectorInterface {
	#params: QuerySelectorParamsInterface;
	#queries: Map<string, NodeListOf<Element>>;

	constructor(params: QuerySelectorParamsInterface) {
		this.#params = params;
		this.#queries = getQueries(params);
	}

	query() {
		this.#queries = getQueries(this.#params);
	}

	get(name: string): Element | undefined {
		return this.#queries.get(name)?.[0];
	}

	getAll(name: string): NodeListOf<Element> | undefined {
		return this.#queries.get(name);
	}
}

function getQueries(
	params: QuerySelectorParamsInterface,
): Map<string, NodeListOf<Element>> {
	const { target, selectors } = params;

	const queries = new Map<string, NodeListOf<Element>>();
	for (let [name, query] of selectors) {
		const queried = target.querySelectorAll(query);
		queries.set(name, queried);
	}

	return queries;
}

export type { QuerySelectorInterface, QuerySelectorParamsInterface };

export { QuerySelector };
