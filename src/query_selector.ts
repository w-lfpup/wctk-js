export interface QuerySelectorParamsInterface {
	parent: ParentNode;
}

export interface QuerySelectorInterface {
	deleteAll(): void;
	querySelector(name: string): Element | undefined;
	querySelectorAll(name: string): Element[] | undefined;
}

export class QuerySelector implements QuerySelectorInterface {
	#queries: Map<string, Element[]> = new Map();
	#params: QuerySelectorParamsInterface;

	constructor(params: QuerySelectorParamsInterface) {
		this.#params = params;
	}

	querySelector(selector: string): Element | undefined {
		return getQuery(this.#params, this.#queries, selector)[0];
	}

	querySelectorAll(selector: string): Element[] {
		return getQuery(this.#params, this.#queries, selector);
	}

	deleteAll() {
		this.#queries = new Map();
	}
}

function getQuery(
	params: QuerySelectorParamsInterface,
	queries: Map<string, Element[]>,
	selector: string,
): Element[] {
	const { parent } = params;

	let results = queries.get(selector);
	if (!results) {
		results = Array.from(parent.querySelectorAll(selector));
		queries.set(selector, results);
	}

	return results;
}
