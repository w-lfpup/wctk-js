interface GenericEventListener<E extends Event> {
    (evt: E): void;
}
interface GenericEventListenerObject<E extends Event> {
    handleEvent(object: E): void;
}
type GenericCallbacks<E extends Event> = GenericEventListener<E> | GenericEventListenerObject<E>;
type EventMap = Partial<{
    [Property in keyof GlobalEventHandlersEventMap]: GenericCallbacks<GlobalEventHandlersEventMap[Property]>;
}> | Record<string, EventListenerOrEventListenerObject>;
interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
export interface EventParamsInterface {
    listeners: EventMap;
    connected?: boolean;
    target: EventElementInterface;
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
