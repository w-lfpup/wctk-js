export interface QuerySelectorInterface {
    querySelector(name: string): Element | undefined;
    querySelectorAll(name: string): Element[];
    deleteAll(): void;
}
export declare class QuerySelector implements QuerySelectorInterface {
    #private;
    constructor(parentNode: ParentNode);
    querySelector(selector: string): Element | undefined;
    querySelectorAll(selector: string): Element[];
    deleteAll(): void;
}
