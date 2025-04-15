type Subscribe<E, A> = (cb: E) => A;
type Unsubscribe<A> = (results: A) => void;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
interface SubscriptionParamsInterface<E, A> {
    host: Object;
    connected?: boolean;
    callback: Function;
    subscribe: Subscribe<E, A>;
    unsubscribe: Unsubscribe<A>;
}
declare class Subscription<E extends Function, A> implements SubscriptionInterface {
    #private;
    constructor(params: SubscriptionParamsInterface<E, A>);
    connect(): void;
    disconnect(): void;
}
export type { Subscribe, Unsubscribe, SubscriptionParamsInterface, SubscriptionInterface, };
export { Subscription };
