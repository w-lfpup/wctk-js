interface QuerySelectorParamsInterface {
    target: Element | ShadowRoot | Document;
    selectors: [string, string][];
}
interface QuerySelectorInterface {
    refresh(): void;
    get(name: string): Element | undefined;
    getAll(name: string): NodeListOf<Element> | undefined;
}
declare class QuerySelector {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    refresh(): void;
    get(name: string): Element | undefined;
    getAll(name: string): NodeListOf<Element> | undefined;
}
export type { QuerySelectorInterface, QuerySelectorParamsInterface };
export { QuerySelector };
