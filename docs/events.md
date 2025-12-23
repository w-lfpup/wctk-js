# Events Controller

Add methods as event listener callbacks.

## How to use

Add an `Events` controller to a web component. Use a params object on instantiation.

### Params

An Events `params` object has four properties:

```ts
interface EventParams {
	callbacks: Record<string, EventListenerOrEventListenerObject>;
	connected?: boolean;
	host: Node;
	target?: Node;
}
```

The `Events` controller binds a set of `callbacks` to a `host`.

Afterwards, the `Events` controller adds the callbacks as event listeners on a `target` node.

The `target` node can be a shadowRoot, a document, or the custom element itself.

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
		callbacks: {
			click: this.#onClick,
			keydown: this.#onKeyDown,
		},
	});

	#onClick(e: PointerEvent) {
		// do something with pointer events here!
	}

	#onKeyDown(e: KeyboardEvent) {
		// do something with key events here!
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

### Shortcut life cycle methods

In the example below, the `connected` property is set to true and callbacks are immediately added to the `target`.

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
		// do something with pointer events here!
	}

	#onKeyDown(e: KeyEvent) {
		// do something with key events here!
	}
}
```

### More complex interactions

If your component requires more complex declarative interactions, consider [superaction](https://github.com/w-lfpup/superaction-js/)
