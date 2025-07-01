export interface MicrotaskParamsInterface {
    host: Object;
    callbacks: Function[];
}
export interface MicrotaskInterface {
    queue(): void;
}
export declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(params: MicrotaskParamsInterface);
    queue(): void;
}
