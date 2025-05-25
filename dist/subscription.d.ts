type Subscribe<A> = (cb: Function) => A;
type Unsubscribe<A> = (affect?: A) => void;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
interface SubscriptionParamsInterface<A> {
    host: Object;
    connected?: boolean;
    callbacks: Function[];
    subscribe: Subscribe<A>;
    unsubscribe: Unsubscribe<A>;
}
declare class Subscription<A> implements SubscriptionInterface {
    #private;
    constructor(params: SubscriptionParamsInterface<A>);
    connect(): void;
    disconnect(): void;
}
export type { Subscribe, Unsubscribe, SubscriptionParamsInterface, SubscriptionInterface, };
export { Subscription };
