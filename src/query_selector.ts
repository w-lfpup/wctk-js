interface QuerySelectorParamsInterface {
	target: Element | ShadowRoot | Document;
	querySelector?: Array<string>;
	querySelectorAll?: Array<string>;
}

interface QuerySelectorInterface {
	query(): void;
	get(name: string): Element | undefined;
	getAll(name: string): Element[] | undefined;
}

class QuerySelector implements QuerySelectorInterface {
	#params: QuerySelectorParamsInterface;
	#queries: Map<string, Element[]>;

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

	getAll(name: string): Element[] | undefined {
		return this.#queries.get(name);
	}
}

function getQueries(
	params: QuerySelectorParamsInterface,
): Map<string, Element[]> {
	const { target, querySelector, querySelectorAll } = params;

	const queries = new Map<string, Element[]>();

	if (querySelectorAll)
		for (let selector of querySelectorAll) {
			const queried = target.querySelectorAll(selector);
			queries.set(selector, Array.from(queried));
		}

	if (querySelector)
		for (let selector of querySelector) {
			if (queries.has(selector)) continue;
			const queried = target.querySelector(selector);
			if (queried) queries.set(selector, [queried]);
		}

	return queries;
}

export type { QuerySelectorInterface, QuerySelectorParamsInterface };

export { QuerySelector };
