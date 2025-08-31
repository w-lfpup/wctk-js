export type Subscribe<E, A> = (cb: E) => A;
export type Unsubscribe<A> = (affect: A) => void;
export interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
export interface SubscriptionParamsInterface<E extends Function, A> {
    host: Object;
    callbacks: E[];
    connected?: boolean;
    subscribe: Subscribe<E, A>;
    unsubscribe: Unsubscribe<A>;
}
export declare class Subscription<E extends Function, A> implements SubscriptionInterface {
    #private;
    constructor(params: SubscriptionParamsInterface<E, A>);
    connect(): void;
    disconnect(): void;
}
