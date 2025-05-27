interface QuerySelectorParamsInterface {
    target: Element | ShadowRoot | Document;
    querySelector: Array<string>;
    querySelectorAll: Array<string>;
}
interface QuerySelectorInterface {
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): Element[] | undefined;
}
declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): Element[] | undefined;
}
export type { QuerySelectorInterface, QuerySelectorParamsInterface };
export { QuerySelector };
