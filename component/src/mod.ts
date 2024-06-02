import {Render} from "../../render/dist/mod.js";

class ComponentWithRender extends HTMLElement {
    #rc = new Render(this);

    attributeChangedCallback() {
        this.#rc.render();
    }

    render() {
        if (this.#rc.queued) return;
        // do something, i dunno what stack people use who cares
    }
}

export { ComponentWithRender }