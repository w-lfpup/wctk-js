# Events Controller

Pass custom element functions to event listeners.

## How to use

### Params

An Events `params` object has three properties:

```ts
interface EventParams {
	bind: Node;
	callbacks: Array<[string, EventListener]>;
	target?: Node;
}
```

Two required properties instruct the Events controller to `bind` a set of `callbacks` to a Node.

Afterwards, the Events controller adds the bound callbacks as event listeners on a `target` Node.

The `target` Node could be a shadowRoot, a document, or the custom element itself.

If the `target` property is  undefined, the `bind` property is used as a fallback.

### Controller

Below is an example of the `Events` controller participating in web component lifecycle methods.

```ts
import { Events, Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc();
	#ec = new Events({
		bind: this,
		target: this.#wc.shadowRoot,
		callbacks: [["keydown", this.#onKeyDown]],
	});

	connectedCallback() {
		this.#ec.connect();
	}

	disconnectedCallback() {
		this.#ec.disconnect();
	}

	#onKeyDown(e: KeyboardEvent) {
		// do something with keyboard events here!
	}
}
```
