type Connect<E, A> = (el: E) => A;
type Disconnect<E, A> = (el: E, args: A) => A;
interface SubscriptionInterface {
    connect(): void;
    disconnect(): void;
}
declare class Subscription<E, A> implements SubscriptionInterface {
    #private;
    constructor(el: E, onConnect: Connect<E, A>, onDisconnect: Disconnect<E, A>);
    connect(): void;
    disconnect(): void;
}
export type { Connect, Disconnect, SubscriptionInterface };
export { Subscription };
