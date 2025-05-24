interface QuerySelectorParamsInterface {
    target: Element | ShadowRoot | Document;
    selectors: [string, string][];
}
interface QuerySelectorInterface {
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): NodeListOf<Element> | undefined;
}
declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): NodeListOf<Element> | undefined;
}
export type { QuerySelectorInterface, QuerySelectorParamsInterface };
export { QuerySelector };
