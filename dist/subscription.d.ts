type Subscribe<E, A> = (cb: E) => A;
type Unsubscribe<A> = (results: A) => void;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
interface SubscriptionParams<E, A> {
    host: Element;
    callback: Function;
    subscribe: Subscribe<E, A>;
    unsubscribe: Unsubscribe<A>;
}
declare class Subscription<E extends Function, A> implements SubscriptionInterface {
    #private;
    constructor(params: SubscriptionParams<E, A>);
    connect(): void;
    disconnect(): void;
}
export type { Subscribe, Unsubscribe, SubscriptionInterface };
export { Subscription };
