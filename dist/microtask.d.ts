interface MicrotaskParamsInterface<E> {
    host: E;
    callbacks: Function[];
}
interface MicrotaskInterface {
    queue(): void;
}
declare class Microtask<E extends Object> implements MicrotaskInterface {
    #private;
    constructor(params: MicrotaskParamsInterface<E>);
    queue(): void;
}
export type { MicrotaskInterface };
export { Microtask };
