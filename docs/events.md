# Events Controller

Pass custom element functions to event listeners.

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

Afterwards, the Events controller adds the callbacks as event listeners on a `target` Node.

The `target` Node could be a shadowRoot, a document, or the custom element itself.

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

The `Events` controller can participate in web component lifecycle methods.

In the example below, the `connected` property is not included. It has a fallback value of `false`.

So the `Events` controller should be connected during the component's lifecycle methods:

```ts
import { Events, Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ this: host });
	#ec = new Events({
		host: this,
		target: this.#wc.shadowRoot,
		callbacks: [
			["click", this.#onClick],
			["pointerover", this.#onPointerOver],
		],
	});

	#onClick(e: PointerEvent) {
		// do something with click events here!
	}

	#pointerOver(e: PointerEvent) {
		// do something with pointerover events here!
	}

	// lifecycle method
	connectedCallback() {
		this.#ec.connect();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#ec.disconnect();
	}
}
```
