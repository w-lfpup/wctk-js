# Render Controller

Render custom elements on the `microtask queue`.

## How to use

Add a `render` controller to a web component.

Call `#rc.render()` wherever appropriate.

In the example below, a "render" occurs when the `width` attribute changes.

```ts
import { Render } from "wctk";

class MyElement extends HTMLElement {
	static observedAttributes = ["width"];

	#wc = new Wc(this);
	#rc = new Render(this);

	attributeChangedCallback() {
		this.#rc.render();
	}

	render() {
		// skip if render is already queued (optional)
		if (!this.#rc.queued) return;

		// update the shadow dom here!
		// this.#wc.shadowRoot
	}
}
```

The `Redner.render()` method can be called multiple times but the corresponding `Element.render()` method will only be called _once_.

It's a kind of asyncronous rendering using the `microtaskQueue`.
