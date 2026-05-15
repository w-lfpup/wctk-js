interface GenericEventListener<E> {
    (evt: E): void;
}
interface GenericEventListenerObject<E> {
    handleEvent(object: E): void;
}
type GenericCallbacks<E> = GenericEventListener<E> | GenericEventListenerObject<E>;
type EventMap = Partial<{
    [Property in keyof GlobalEventHandlersEventMap]: GenericCallbacks<GlobalEventHandlersEventMap[Property]>;
}>;
interface EventElementInterface {
    addEventListener: Element["addEventListener"];
    removeEventListener: Element["removeEventListener"];
}
export interface EventParamsInterface {
    callbacks: EventMap;
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
