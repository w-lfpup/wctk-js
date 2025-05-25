type Subscribe<E, A> = (cb: E) => A;
type Unsubscribe<A> = (affect?: A) => void;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
interface SubscriptionParamsInterface<E extends Function, A> {
    host: Object;
    callbacks: E[];
    connected?: boolean;
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
