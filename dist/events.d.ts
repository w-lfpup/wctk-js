export type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;
export interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
export interface EventsElementInterface {
    addEventListener: Node["addEventListener"];
    removeEventListener: Node["removeEventListener"];
}
export interface EventParamsInterface {
    host: EventsElementInterface;
    connected?: boolean;
    target?: EventsElementInterface;
    callbacks: Callbacks;
}
export declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParamsInterface);
    connect(): void;
    disconnect(): void;
}
