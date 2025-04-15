interface MicrotaskInterface {
    queue(): void;
}
declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(el: Object, callbacks: Function[]);
    queue(): void;
}
export type { MicrotaskInterface };
export { Microtask };
