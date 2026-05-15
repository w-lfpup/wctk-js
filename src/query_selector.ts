export interface QuerySelectorInterface {
	querySelector(name: string): Element | undefined;
	querySelectorAll(name: string): Element[];
	deleteAll(): void;
}

export class QuerySelector implements QuerySelectorInterface {
	#queries: Map<string, Element | undefined> = new Map();
	#queryAlls: Map<string, Element[]> = new Map();
	#parentNode: ParentNode;

	constructor(parentNode: ParentNode) {
		this.#parentNode = parentNode;
	}

	querySelector(selector: string): Element | undefined {
		if (this.#queries.has(selector)) return this.#queries.get(selector);

		let query = this.#parentNode.querySelector(selector) ?? undefined;
		this.#queries.set(selector, query);
		return query;
	}

	querySelectorAll(selector: string): Element[] {
		let results = this.#queryAlls.get(selector);
		if (results) return results;

		let query = Array.from(this.#parentNode.querySelectorAll(selector));
		this.#queryAlls.set(selector, query);
		return query;
	}

	deleteAll() {
		this.#queries = new Map();
		this.#queryAlls = new Map();
	}
}
