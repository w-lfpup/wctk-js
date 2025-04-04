interface MicrotaskInterface {
    queue(): void;
}
declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(el: EventTarget, callback: Function);
    queue(): void;
}
export type { MicrotaskInterface };
export { Microtask };
