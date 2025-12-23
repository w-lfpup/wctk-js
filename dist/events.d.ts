export interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
export interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
type handlers = GlobalEventHandlersEventMap & WindowEventHandlersEventMap & DocumentEventMap;
interface GenericEventListener<E> {
    (evt: E): void;
}
interface GenericEventListenerObject<E> {
    handleEvent(object: E): void;
}
type GenericCallbacks<E> = GenericEventListener<E> | GenericEventListenerObject<E>;
type EventMap = Partial<{
    [Property in keyof handlers]: GenericCallbacks<handlers[Property]>;
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
