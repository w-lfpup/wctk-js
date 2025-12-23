interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
type EventHandlers = GlobalEventHandlersEventMap & DocumentEventMap;
interface GenericEventListener<E> {
    (evt: E): void;
}
interface GenericEventListenerObject<E> {
    handleEvent(object: E): void;
}
type GenericCallbacks<E> = GenericEventListener<E> | GenericEventListenerObject<E>;
type EventMap = Partial<{
    [Property in keyof EventHandlers]: GenericCallbacks<EventHandlers[Property]>;
}>;
export interface EventParamsInterface {
    callbacks: EventMap;
    connected?: boolean;
    host: EventElementInterface;
    target?: EventElementInterface;
}
export interface EventsInterface {
    connect(): void;
    disconnect(): void;
}
export declare class Events implements EventsInterface {
    #private;
    constructor(params: EventParamsInterface);
    connect(): void;
    disconnect(): void;
}
export {};
