type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;
interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
interface EventsElementInterface {
    addEventListener: Node["addEventListener"];
    removeEventListener: Node["removeEventListener"];
}
interface EventParams {
    bind: Node;
    target?: Node;
    callbacks: Callbacks;
}
declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParams);
    connect(): void;
    disconnect(): void;
}
export type { Callbacks, EventsInterface, EventsElementInterface, EventParams };
export { Events };
