export interface QuerySelectorParamsInterface {
    parent: ParentNode;
}
export interface QuerySelectorInterface {
    querySelector(name: string): Element | undefined;
    querySelectorAll(name: string): Element[] | undefined;
    deleteAll(): void;
}
export declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(params: QuerySelectorParamsInterface);
    querySelector(selector: string): Element | undefined;
    querySelectorAll(selector: string): Element[];
    deleteAll(): void;
}
