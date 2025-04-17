type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;
interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
interface EventsElementInterface {
    addEventListener: Node["addEventListener"];
    removeEventListener: Node["removeEventListener"];
}
interface EventParamsInterface {
    host: EventsElementInterface;
    connected?: boolean;
    target?: EventsElementInterface;
    callbacks: Callbacks;
}
declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParamsInterface);
    connect(): void;
    disconnect(): void;
}
export type { Callbacks, EventsInterface, EventsElementInterface, EventParamsInterface };
export { Events };
