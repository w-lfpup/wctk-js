# Events Controller

Events for web components made easy in <900 bytes.

## Api

Properties:
- N/A

Methods:
- constructor -> `(HtmlElement): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add an `Events` controller to a web component.

Add a list of `eventNames` and `callbacks`

```ts
import { Events } from "./render/dist/mod.js";

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
		// do something with the pointer event
	}

	#onKeyDown(e: KeyboardEvent) {
		// do something with the pointer event
	}
}
```

### details

The `Events` controller adds event listeners and binds callbacks to the host component.
