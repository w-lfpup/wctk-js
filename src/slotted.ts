interface SlottedParamsInterface {
	target: ShadowRoot;
	connected: boolean;
}

interface NewAble<A> {
	new (): A;
}

interface SlottedInterface {
	query(): void;
	assignedNodes<A>(slotName: string, newable: NewAble<A>): Node[] | undefined,
	assignedElements(slotName: string, selectors: string): Element[] | undefined,
}

class Slotted implements SlottedInterface {
	#params: SlottedParamsInterface;
	#slots: Map<string, HTMLSlotElement>;

	constructor(params: SlottedParamsInterface) {
		this.#params = params;
		this.#slots = getSlotElements(this.#params.target);
	}

	query() {
		this.#slots = getSlotElements(this.#params.target);
	}

	assignedNodes(slotName: string): Node[] | undefined {
		return this.#slots.get(slotName)?.assignedNodes();
	}

	assignedElements(slotName: string): Element[] | undefined {
		return this.#slots.get(slotName)?.assignedElements();
	}

	assignedInstances<A>(slotName: string, newable: NewAble<A>) {
		let slot = this.#slots.get(slotName);

		let instances = [];
		if (slot)
			for (const node of slot.assignedNodes()) {
				if (node instanceof newable) instances.push(node);
			}

		return instances;
	}

	assignedMatches(slotName: string, selectors: string): Element[] {
		let slot = this.#slots.get(slotName);

		let matches = [];
		if (slot)
			for (const element of slot.assignedElements()) {
				if (element.matches(selectors)) matches.push(element);
			}

		return matches;
	}
}

function getSlotElements(target: ShadowRoot): Map<string, HTMLSlotElement> {
	const slotMap: Map<string, HTMLSlotElement> = new Map();
	const slots = target.querySelectorAll("slot");
	for (const slot of Array.from(slots)) {
		if (slot instanceof HTMLSlotElement) {
			slotMap.set(slot.name, slot);
		}
	}

	return slotMap;
}

export type { SlottedParamsInterface, SlottedInterface };

export { Slotted };
