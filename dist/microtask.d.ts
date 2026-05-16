export interface MicrotaskInterface {
    queue(): void;
}
type Callback = () => void;
export declare class Microtask implements MicrotaskInterface {
    #private;
    queue: () => void;
    constructor(callback: Callback);
}
export {};
