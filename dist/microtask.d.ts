export interface MicrotaskInterface {
    queue(): void;
}
type Callback = () => void;
export declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(callback: Callback);
    queue: () => void;
}
export {};
