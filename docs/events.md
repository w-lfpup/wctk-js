# Events Controller

Bind event listeners to custom elements.

## Api

Properties:

- N/A

Methods:

- constructor -> `({bind: Node, target?: Node, callbacks: [[string, EventListener], ...]]): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add an `Events` controller to a web component.

Add a list of event names and event listener callbacks on construction.

```ts
import { Events } from "wctk";

class MyElement extends HTMLElement {
	#ev = new Events({
		bind: this,
		callbacks: [["keydown", this.#onKeyDown]],
	});

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
