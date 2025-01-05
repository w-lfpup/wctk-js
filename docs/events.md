# Events Controller

Bind event listeners to custom elements.

## Api

Properties:
- N/A

Methods:
- constructor -> `(HtmlElement, [[string, eventListener], ...]): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add an `Events` controller to a web component.

Add a list of event names and event listener callbacks on construction.

```ts
import { Events } from "wctk";

class MyElement extends HTMLElement {
	#ev = new Events(this, [
		["pointerup", this.#onPointerUp],
		["keydown", this.#onKeyDown]
	]);

	connectedCallback() {
		this.#ev.connect();
	}

	disconnectedCallback() {
		this.#ev.disconnect();
	}

	#onPointerUp(e: PointerEvent) {
		// do pointer event stuff here
	}

	#onKeyDown(e: KeyboardEvent) {
		// do something with keyboard events here!
	}
}
```

### Details

The `Events` controller will bind any callbacks _not already bound_ to the host component.
