export interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
export interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
type handlers = GlobalEventHandlersEventMap & WindowEventHandlersEventMap & DocumentEventMap;
interface TypedCallback<E> {
    (evt: E): void;
}
interface TypedEventListenerCallback<E> {
    handleEvent(object: E): void;
}
type TypedEventListeners<E> = TypedCallback<E> | TypedEventListenerCallback<E>;
type EventMap = Partial<{
    [Property in keyof handlers]: TypedEventListeners<handlers[Property]>;
}>;
export type Callbacks = Array<[string, EventListenerOrEventListenerObject]>;
export interface EventParamsInterface {
    host: EventElementInterface;
    connected?: boolean;
    target?: EventElementInterface;
    callbacks: EventMap;
}
export declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParamsInterface);
    connect(): void;
    disconnect(): void;
}
export {};
