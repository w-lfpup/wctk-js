interface GenericEventListener<E extends Event> {
    (evt: E): void;
}
interface GenericEventListenerObject<E extends Event> extends EventListenerObject {
    handleEvent(object: E): void;
}
type GenericCallbacks<E extends Event> = GenericEventListener<E> | GenericEventListenerObject<E>;
type EventMaps = DocumentEventMap & GlobalEventHandlersEventMap & ElementEventMap;
type ListenerMap = Partial<{
    [Property in keyof EventMaps]: GenericCallbacks<EventMaps[Property]>;
}> | Record<string, EventListenerOrEventListenerObject>;
interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
export interface EventParamsInterface {
    listeners: ListenerMap;
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
