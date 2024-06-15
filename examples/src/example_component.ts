import { Shadow, Styles, Render, Subscribe } from "../../wctk/dist/mod.js";

const fontStyles = `
    :root {
        color: greyblue;
    }
`;

const layoutStyles = `
	:root {
		background-color: black;
	} 
`;

function hello(el: HtmlELement & WithRender) {
	el.render();
	return store.subscribe(() => {el.render()})
}

function goodbye(unsubscribe, el: HtmlELement & WithRender) {
	unsubscribe();
}

class MyElement extends HTMLElement {
	#rc = new Render(this);
	#sd = new Shadow(this, { mode: "closed" });
	#ss = new Styles(this.#sd.shadowRoot, [fontStyles, layoutStyles]);
	#af = new Affect(this, hello, goodbye);
	#ev = new Events(this.#sd, [
		["pointerdown", this.#hello],
		["goodbye", this.#hello],
	]);

	#hello(e: Event) {}

	render() {
		// prevent direct render calls when a render is already queued
		if (this.#rc.queued) return;

		// do something here!
		// i dunno what stack people use, it shouldn't matter
	}

	// life cycle
	attributeChangedCallback() {
		this.#rc.render();
	}

	onConnectedCallback() {
		this.#af.connect();
	}

	onDisconnectedCallback() {
		this.#af.disconnect();
	}
}

customElements.define("my-element", MyElement);

export { MyElement };
