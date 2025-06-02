interface SlottedParamsInterface {
	target: ShadowRoot;
	connected: boolean;
}

interface SlottedInterface {}

class Slotted implements SlottedInterface {
	#params: SlottedParamsInterface;
	#slots: Map<string, HTMLSlotElement> = new Map();

	constructor(params: SlottedParamsInterface) {
		this.#params = params;
		if (this.#params.connected) this.query();
	}

	query() {
		this.#slots = getSlotMap(this.#params.target);
	}

	assignedNodes(slotName: string): Node[] | undefined {
		let slot = this.#slots.get(slotName);
		if (slot) return slot.assignedNodes();
	}

	assignedElements(slotName: string): Element[] | undefined {
		let slot = this.#slots.get(slotName);
		if (slot) return slot.assignedElements();
	}
}

function getSlotMap(target: ShadowRoot): Map<string, HTMLSlotElement> {
	const slotMap: Map<string, HTMLSlotElement> = new Map();
	const slots = target.querySelectorAll("slot");
	for (const slot of Array.from(slots)) {
		if (slot instanceof HTMLSlotElement) {
			slotMap.set(slot.name, slot);
		}
	}

	return slotMap;
}
