# Events Controller

Add element functions as event listener callbacks.

## How to use

### Params

An Events `params` object has four properties:

```ts
interface EventParams {
	host: Node;
	callbacks: Array<[string, EventListener]>;
	connected?: boolean;
	target?: Node;
}
```

Two required properties instruct the Events controller to bind a set of `callbacks` to a `host`.

Afterwards, the Events controller adds the callbacks as event listeners on a `target` node.

The `target` node could be a shadowRoot, a document, or the custom element itself.

If the `target` property is undefined, the `host` property is used as a fallback.

### Controller

Here is an example of using the `Events` controller.

```ts
import { Events, Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ this: host });
	#ec = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		connected: true,
		callbacks: [
			["click", this.#onClick],
			["keydown", this.#onKeyDown],
		],
	});

	#onClick(e: PointerEvent) {
		// do something with click events here!
	}

	#onKeyDown(e: KeyEvent) {
		// do something with keyboard events here!
	}
}
```

### Life cycle methods

In the example below, the `connected` property is not included. It has a fallback value of `false`.

So the `Events` controller should be called on the component's `connect` and `disconnect` lifecycle methods:

```ts
import { Events, Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ this: host });
	#ec = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		callbacks: [
			["click", this.#onClick],
			["keydown", this.#onKeyDown],
		],
	});

	// lifecycle method
	connectedCallback() {
		this.#ec.connect();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#ec.disconnect();
	}

	#onClick(e: PointerEvent) {
		// do something with click events here!
	}

	#onKeyDown(e: KeyEvent) {
		// do something with keyboard events here!
	}
}
```
