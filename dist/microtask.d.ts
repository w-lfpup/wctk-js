interface MicrotaskParamsInterface {
    host: Object;
    callbacks: Function[];
}
interface MicrotaskInterface {
    queue(): void;
}
declare class Microtask implements MicrotaskInterface {
    #private;
    constructor(params: MicrotaskParamsInterface);
    queue(): void;
}
export type { MicrotaskInterface };
export { Microtask };
