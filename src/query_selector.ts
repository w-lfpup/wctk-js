interface QuerySelectorParamsInterface {
	target: Element | ShadowRoot | Document;
	selectors: [string, string][];
}

interface QuerySelectorInterface {
	refresh(): void;
	get(name: string): Element | undefined;
	getAll(name: string): NodeListOf<Element> | undefined;
}

class QuerySelector {
	#params: QuerySelectorParamsInterface;
	#queries: Map<string, NodeListOf<Element>>;

	constructor(params: QuerySelectorParamsInterface) {
		this.#params = params;
		this.#queries = getQueries(params);
	}

	refresh() {
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
	let { target, selectors } = params;

	let queries = new Map<string, NodeListOf<Element>>();
	for (let [name, query] of selectors) {
		const queried = target.querySelectorAll(query);
		queries.set(name, queried);
	}

	return queries;
}

export type { QuerySelectorInterface, QuerySelectorParamsInterface };

export { QuerySelector };
