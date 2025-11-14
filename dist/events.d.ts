export type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;
export interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
export interface EventElementInterface {
    addEventListener: GlobalEventHandlers["addEventListener"];
    removeEventListener: GlobalEventHandlers["removeEventListener"];
}
export interface EventParamsInterface {
    host: EventElementInterface;
    connected?: boolean;
    target?: EventElementInterface;
    callbacks: Callbacks;
}
export declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParamsInterface);
    connect(): void;
    disconnect(): void;
}
