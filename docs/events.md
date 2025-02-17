# Events Controller

Bind event listeners to custom elements.

## Api

Properties:

- N/A

Methods:

- constructor -> `(el: Node, callbacks: [[string, EventListener], ...], eventTargetEl: Node?]): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add an `Events` controller to a web component.

Add a list of event names and event listener callbacks on construction.

```ts
import { Events } from "wctk";

class MyElement extends HTMLElement {
	#ev = new Events(this, [["keydown", this.#onKeyDown]]);

	connectedCallback() {
		this.#ev.connect();
	}

	disconnectedCallback() {
		this.#ev.disconnect();
	}

	#onKeyDown(e: KeyboardEvent) {
		// do something with keyboard events here!
	}
}
```
