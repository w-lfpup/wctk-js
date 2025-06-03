class Slotted {
    #params;
    #boundOnSlotChange;
    #slots;
    constructor(params) {
        this.#params = params;
        this.#boundOnSlotChange = this.#onSlotChange.bind(this);
        this.#slots = getSlotElements(this.#params.target);
        if (this.#params.connected)
            this.connect();
    }
    #onSlotChange(e) {
        let { target } = e;
        if (target instanceof HTMLSlotElement) {
            this.#slots.set(target.name, target);
        }
    }
    connect() {
        this.#params.target.addEventListener("slotchange", this.#boundOnSlotChange);
    }
    disconnect() {
        this.#params.target.removeEventListener("slotchange", this.#boundOnSlotChange);
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
    assignedInstances(slotName, instance) {
        let slot = this.#slots.get(slotName);
        let instances = [];
        if (slot)
            for (const node of slot.assignedNodes()) {
                if (node instanceof instance)
                    instances.push(node);
            }
        return instances;
    }
    assignedMatches(slotName, selector) {
        let slot = this.#slots.get(slotName);
        let matches = [];
        if (slot)
            for (const element of slot.assignedElements()) {
                if (element.matches(selector))
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
