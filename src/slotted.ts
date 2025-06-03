interface SlottedParamsInterface {
	target: ShadowRoot;
	assignedInstances: [
		["slotName", HTMLElement, {flatten: true}]
	],
	assignedMatches: [
		["slotName", "span", {flatten: true}]
	]
}

interface NewAble<A> {
	new (): A;
}

interface SlottedInterface {
	query(): void;
	assignedNodes(
		slotName: string,
		options?: AssignedNodesOptions,
	): ReturnType<HTMLSlotElement["assignedNodes"]> | undefined;
	assignedElements(
		slotName: string,
		options?: AssignedNodesOptions,
	): ReturnType<HTMLSlotElement["assignedElements"]> | undefined;
	assignedInstances<A>(
		slotName: string,
		newable: NewAble<A>,
		options?: AssignedNodesOptions,
	): A[] | undefined;
	assignedMatches(
		slotName: string,
		selectors: string,
		options?: AssignedNodesOptions,
	): Element[] | undefined;
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

	assignedNodes(
		slotName: string,
		options?: AssignedNodesOptions,
	): Node[] | undefined {
		return this.#slots.get(slotName)?.assignedNodes(options);
	}

	assignedElements(
		slotName: string,
		options?: AssignedNodesOptions,
	): Element[] | undefined {
		return this.#slots.get(slotName)?.assignedElements(options);
	}

	assignedInstances<A>(slotName: string, newable: NewAble<A>, options?: AssignedNodesOptions): A[] | undefined {
		let slot = this.#slots.get(slotName);
		if (slot) {
			let instances: A[] = [];
			for (const node of slot.assignedNodes(options)) {
				if (node instanceof newable) instances.push(node);
			}

			return instances;
		}
	}

	assignedMatches(slotName: string, selectors: string, options?: AssignedNodesOptions): Element[] | undefined {
		let slot = this.#slots.get(slotName);
		if (slot) {
			let matches: Element[] = [];
			for (const element of slot.assignedElements(options)) {
				if (element.matches(selectors)) matches.push(element);
			}

			return matches;
		}
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
