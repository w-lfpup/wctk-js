type Connect<E, A> = (cb: E) => A;
type Disconnect<A> = (results: A) => void;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
declare class Subscription<E extends Function, A> implements SubscriptionInterface {
    #private;
    constructor(el: Object, cb: E, onConnect: Connect<E, A>, onDisconnect: Disconnect<A>);
    connect(): void;
    disconnect(): void;
}
export type { Connect, Disconnect, SubscriptionInterface };
export { Subscription };
