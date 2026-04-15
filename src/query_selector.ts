export interface QuerySelectorInterface {
	querySelector(name: string): Element | undefined;
	querySelectorAll(name: string): Element[];
	deleteAll(): void;
}

export class QuerySelector implements QuerySelectorInterface {
	#queries: Map<string, Element> = new Map();
	#queryAlls: Map<string, Element[]> = new Map();
	#parentNode: ParentNode;

	constructor(parentNode: ParentNode) {
		this.#parentNode = parentNode;
	}

	querySelector(selector: string): Element | undefined {
		let results = this.#queries.get(selector);
		if (!results) {
			results = this.#parentNode.querySelector(selector) ?? undefined;
			if (results) this.#queries.set(selector, results);
		}

		return results;
	}

	querySelectorAll(selector: string): Element[] {
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
