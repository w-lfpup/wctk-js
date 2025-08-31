# Microtask Controller

Add functions to the `microtask queue`.

## How to use

Add a `Microtask` controller to a web component. Provide a callback.

Call `Microtask.queue()` to add the callbacks to the microtask queue.

In the example below, a Microtask controller queues a render when the `width` attribute changes.

```ts
import { Microtask } from "wctk";

class MyElement extends HTMLElement {
	static observedAttributes = ["width"];

	#rc = new Microtask({
		host: this,
		callbacks: [this.#render],
	});

	// lifecycle method
	attributeChangedCallback() {
		this.#rc.queue();
	}

	#render() {
		// update DOM here!
	}
}
```

The `Microtask.queue()` method can be called multiple times per event loop but the callbacks will only be called _once_ per microtask queue.
