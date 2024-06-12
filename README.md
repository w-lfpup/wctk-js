# Web Component Tool Kit

Reactive web components without inheritance.

## About

`Wctk` is a compositional approach to web components.

It is designed to work _up until_ a developer needs to take control. Usually `control` can be defined by gathering state, listening for state, and creating DOM.

There is no inheritance other than initially extending an `HtmlElement`! (which is required by a browser anyways)

Instead a `controllers` are used.

## Controllers

Only a handful of controllers are needed to provide:

- reactivity -> the [Render](./render/README.md) controller
- declarative or imperative shadow dom -> the [Shadow](./shadow/README.md) controller
- styles -> the [Styles](./styles/README.md) controller

## Minimal Component Setup

Start with the web component properties required to create a new custom element.

The code below is all standard browser web apis.

```ts
class MyElement extends HTMLElement {
	// create reactive attributes
	static observerdAttributes = ["message", "color"];

	attributeChangedCallback() {}
}

customElements.define("my-element", MyElement);

export { MyElement };
```

Then add controllers from `wctk` for reactivity.

```ts
import { Render, Shadow } from "../../wctk/dist/mod.js";

class MyElement extends HTMLElement {
    static observerdAttributes = ["message", "color"];

    // add controllers
    #rc = new Render(this);
	#sd = new Shadow(this, { mode: "closed" });

    // first render
    constructor() {
        super();

        if this.#sd.declarative {
            // add event listeners
        } else {
            // compose DOM
        }
    }

    // queue render on attribute changes
	attributeChangedCallback() {
		this.#rc.render();
	}

    // get state and apply changes to shadowRoot
	render() {
        if (this.#rc.queued) return;
        // do something here!
	}
}

customElements.define('my-element', MyElement);

export { MyElement };
```

## Details

`Wctk` weighs in at a hefty 350 bytes minified and zipped.

There are no included DOM managers in `wctk`.

When a compnent requires a library like `preact` or `lit`, Wolfpup doesn't know _how_ you will integrate that library into your application.

Is your external library bundled? Modular, asynchronously imported?

Either way I consider a library / module shared across components to be in the application data domain. Assuming _how_ a developer imports their libraries puts `wctk` at risk of polluiting the application space by unintentionally importing preact or lit several times into a single web app.

## License

`Wctk` is released under the BSD-3 Clause License.
