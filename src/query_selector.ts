export interface QuerySelectorInterface {
	querySelector(name: string): Element | undefined;
	querySelectorAll(name: string): Element[] | undefined;
	deleteAll(): void;
}

export class QuerySelector implements QuerySelectorInterface {
	#queries: Map<string, Element[]> = new Map();
	#parentNode: ParentNode;

	constructor(parentNode: ParentNode) {
		this.#parentNode = parentNode;
	}

	querySelector(selector: string): Element | undefined {
		return getQuery(this.#parentNode, this.#queries, selector)[0];
	}

	querySelectorAll(selector: string): Element[] {
		return getQuery(this.#parentNode, this.#queries, selector);
	}

	deleteAll() {
		this.#queries = new Map();
	}
}

function getQuery(
	parentNode: ParentNode,
	queries: Map<string, Element[]>,
	selector: string,
): Element[] {
	let results = queries.get(selector);
	if (!results) {
		results = Array.from(parentNode.querySelectorAll(selector));
		queries.set(selector, results);
	}

	return results;
}
