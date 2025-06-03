interface SlottedParamsInterface {
    target: ShadowRoot;
    connected: boolean;
}
interface SlottedInterface {
}
interface NewAble<A> {
    new (): A;
}
declare class Slotted implements SlottedInterface {
    #private;
    constructor(params: SlottedParamsInterface);
    connect(): void;
    disconnect(): void;
    query(): void;
    assignedNodes(slotName: string): Node[] | undefined;
    assignedElements(slotName: string): Element[] | undefined;
    assignedInstances<A>(slotName: string, instance: NewAble<A>): (Node & A)[];
    assignedMatches(slotName: string, selector: string): Element[];
}
export type { SlottedParamsInterface, SlottedInterface };
export { Slotted };
