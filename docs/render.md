# Render Controller

Asyncronous render utility class for custom elements.

## Api

Properties:

- queued -> `bool`

Methods:

- constructor -> `(el: {render(): void}): void`
- render -> `void`

## How to use

Add a `render` controller to a web component.

Call `#rc.render()` wherever appropriate.

In the example below, a "render" occurs when the `width` attribute changes.

```ts
import { Render } from "wctk";

class MyElement extends HTMLElement {
	static observedAttributes = ["width"];

	#rc = new Render(this);

	attributeChangedCallback() {
		this.#rc.render();
	}

	render() {
		// update dom here!
		//
		// optional, skip if render is already queued!
		if (!this.#rc.queued) return;
	}
}
```

### Details

The `Redner.render()` method can be called multiple times but the corresponding `Element.render()` method will only be called _once_ per event loop.

It's a kind of asyncronous rendering using the `microtaskQueue`.
