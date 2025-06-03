interface SlottedParamsInterface {
	target: ShadowRoot;
	connected: boolean;
}

interface SlottedInterface {}

interface NewAble<A> {
	new (): A;
}

class Slotted implements SlottedInterface {
	#params: SlottedParamsInterface;
	#boundOnSlotChange: EventListenerOrEventListenerObject;
	#slots: Map<string, HTMLSlotElement>;

	constructor(params: SlottedParamsInterface) {
		this.#params = params;
		this.#boundOnSlotChange = this.#onSlotChange.bind(this);
		this.#slots = getSlotElements(this.#params.target);

		if (this.#params.connected) this.connect();
	}

	#onSlotChange(e: Event) {
		let { target } = e;
		if (target instanceof HTMLSlotElement) {
			this.#slots.set(target.name, target);
		}
	}

	connect() {
		this.#params.target.addEventListener("slotchange", this.#boundOnSlotChange);
	}

	disconnect() {
		this.#params.target.removeEventListener(
			"slotchange",
			this.#boundOnSlotChange,
		);
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

	assignedInstances<A>(slotName: string, instance: NewAble<A>) {
		let slot = this.#slots.get(slotName);

		let instances = [];
		if (slot)
			for (const node of slot.assignedNodes()) {
				if (node instanceof instance) instances.push(node);
			}

		return instances;
	}

	assignedMatches(slotName: string, selector: string): Element[] {
		let slot = this.#slots.get(slotName);

		let matches = [];
		if (slot)
			for (const element of slot.assignedElements()) {
				if (element.matches(selector)) matches.push(element);
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
