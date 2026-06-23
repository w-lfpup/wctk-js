export interface MicrotaskInterface {
    queue(): void;
}
interface Callback {
    (): void;
}
export declare class Microtask implements MicrotaskInterface {
    #private;
    queue: () => void;
    constructor(callback: Callback);
}
export {};
