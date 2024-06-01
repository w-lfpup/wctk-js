import type {WithRender} from "../../render/src/queue_render.ts";
import {Render} from "../../render/src/queue_render.js";

// #uc and #rc controllers make sure multiple updates and renders are not called
// attributeChangedCallback() occurs for every attribute changed

// start with
// the point is that a Web Component is an HTMLElement but it is _also_ an Object
// a context that holds state
// if a mouse event happens? simply save the mouse event and call render
// render can figure out if it needs to render based on a mouse event
class WctkComponent extends HTMLElement {
    #rc = new Render(this);

    // signifies a kind of state change
    attributeChangedCallback() {
        // regardless, call a render
        this.#rc.render();
    }

    render() {
        // prevent extra renders
        if (this.#rc.queued) return;
        // grab state

        // do something, i dunno what stack people use who cares
    }
}


export type { }

export { WctkComponent }