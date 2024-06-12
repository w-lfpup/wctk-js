import { Shadow, Styles, Render } from "../../wctk/dist/mod.js";

const fontStyles = `
    :root {
        color: greyblue;
    }
`;

const layoutStyles = `
	background-color: black;
`;

class MyElement extends HTMLElement {
	#rc = new Render(this);
	#sd = new Shadow(this, { mode: "closed" });
	#ss = new Styles(this.#sd.shadowRoot, [fontStyles, layoutStyles]);

	attributeChangedCallback() {
		this.#rc.render();
	}

	render() {
		// prevent direct render calls when a render is already queued
		if (this.#rc.queued) return;

		// do something here!
		// i dunno what stack people use, it shouldn't matter
	}
}

customElements.define("my-element", MyElement);

export { MyElement };
