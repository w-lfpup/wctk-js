interface MicrotaskInterface {
    readonly queued: boolean;
    queue(): void;
}
interface MicrotaskElementInterface {
    queue(): void;
}
declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(el: EventTarget, callback: Function);
    get queued(): boolean;
    queue(): void;
}
export type { MicrotaskElementInterface, MicrotaskInterface };
export { Microtask };
