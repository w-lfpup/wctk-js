interface SlottedParamsInterface {
    target: ShadowRoot;
    connected: boolean;
}
interface NewAble<A> {
    new (): A;
}
interface SlottedInterface {
    query(): void;
    assignedNodes<A>(slotName: string, newable: NewAble<A>): Node[] | undefined;
    assignedElements(slotName: string, selectors: string): Element[] | undefined;
}
declare class Slotted implements SlottedInterface {
    #private;
    constructor(params: SlottedParamsInterface);
    query(): void;
    assignedNodes(slotName: string): Node[] | undefined;
    assignedElements(slotName: string): Element[] | undefined;
    assignedInstances<A>(slotName: string, newable: NewAble<A>): (Node & A)[];
    assignedMatches(slotName: string, selectors: string): Element[];
}
export type { SlottedParamsInterface, SlottedInterface };
export { Slotted };
