export interface QuerySelectorParamsInterface {
    parent: ParentNode;
}
export interface QuerySelectorInterface {
    deleteAll(): void;
    querySelector(name: string): Element | undefined;
    querySelectorAll(name: string): Element[] | undefined;
}
export declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    querySelector(selector: string): Element | undefined;
    querySelectorAll(selector: string): Element[];
    deleteAll(): void;
}
