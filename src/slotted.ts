interface SlottedParamsInterface {
	target: ShadowRoot;
}

interface SlottedInterface {}

class Slotted implements SlottedInterface {
	#params: SlottedParamsInterface;
	#boundOnSlotChange: EventListenerOrEventListenerObject;
	#slottedNodeMap: WeakMap<HTMLSlotElement, Node[]> = new WeakMap();
	#slottedElementMap: Map<HTMLSlotElement, Element[]> = new Map();

	constructor(params: SlottedParamsInterface) {
		this.#params = params;

		// get child slots
		this.#boundOnSlotChange = this.#onSlotChange.bind(this);
	}

	#onSlotChange(e: Event) {
		const { target } = e;
		if (target instanceof HTMLSlotElement) {
			this.#slottedElementMap.set(target, target.assignedElements());
			this.#slottedNodeMap.set(target, target.assignedNodes());
		}
	}

	query() {
		let slots = this.#params.target.querySelectorAll("slot");
		for (const slot of Array.from(slots)) {
			if (slot instanceof HTMLSlotElement) {
				let { name } = slot;
			}
		}
	}

	connect(): void {
		this.#params.target.addEventListener("slotchange", this.#boundOnSlotChange);
	}

	disconnect(): void {
		this.#params.target.removeEventListener(
			"slotchange",
			this.#boundOnSlotChange,
		);
	}

	assignedNodes(slotName: string): Node[] | undefined {
		return;
	}

	assignedElements(slotName: string): Element[] | undefined {
		return;
	}
}

function setChildElements(
	target: Element,
	nodeMap: Map<HTMLSlotElement, Element[]>,
): void {
	const nameMap: WeakMap<HTMLSlotElement, string> = new WeakMap();

	for (const child of Array.from(target.children)) {
		let { assignedSlot } = child;
		if (!assignedSlot) continue;

		let slotName = nameMap.get(assignedSlot);
		if (!slotName) {
			slotName = child.getAttribute("slot") ?? "";
			nameMap.set(assignedSlot, slotName);
		}

		let nodes = nodeMap.get(assignedSlot) ?? [];
		nodes.push(child);
		nodeMap.set(assignedSlot, nodes);
	}
}

function updateSlottedElements(
	slotName: string,
	slot: HTMLSlotElement,
	elementMap: Map<string, Element[]>,
): void {
	elementMap.set(slotName, slot.assignedElements());
}

function updateSlottedNodes(
	slotName: string,
	slot: HTMLSlotElement,
	nodeMap: Map<string, Node[]>,
): void {
	nodeMap.set(slotName, slot.assignedNodes());
}
