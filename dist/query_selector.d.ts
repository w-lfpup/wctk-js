export interface QuerySelectorParamsInterface {
    parent: ParentNode;
    querySelector?: Array<string>;
    querySelectorAll?: Array<string>;
}
export interface QuerySelectorInterface {
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): Element[] | undefined;
}
export declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    query(): void;
    get(name: string): Element | undefined;
    getAll(name: string): Element[] | undefined;
}
