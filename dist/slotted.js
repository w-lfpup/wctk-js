class Slotted {
    #params;
    #slots;
    constructor(params) {
        this.#params = params;
        this.#slots = getSlotElements(this.#params.target);
    }
    query() {
        this.#slots = getSlotElements(this.#params.target);
    }
    assignedNodes(slotName) {
        return this.#slots.get(slotName)?.assignedNodes();
    }
    assignedElements(slotName) {
        return this.#slots.get(slotName)?.assignedElements();
    }
    assignedInstances(slotName, newable) {
        let slot = this.#slots.get(slotName);
        let instances = [];
        if (slot)
            for (const node of slot.assignedNodes()) {
                if (node instanceof newable)
                    instances.push(node);
            }
        return instances;
    }
    assignedMatches(slotName, selectors) {
        let slot = this.#slots.get(slotName);
        let matches = [];
        if (slot)
            for (const element of slot.assignedElements()) {
                if (element.matches(selectors))
                    matches.push(element);
            }
        return matches;
    }
}
function getSlotElements(target) {
    const slotMap = new Map();
    const slots = target.querySelectorAll("slot");
    for (const slot of Array.from(slots)) {
        if (slot instanceof HTMLSlotElement) {
            slotMap.set(slot.name, slot);
        }
    }
    return slotMap;
}
export { Slotted };
