# Subscribe Controller

Subscribe web components to external state.

## How to use

### Callbacks

Create functions that subscribe and unsubscribe an element from a data store.

The result of the subscribe function is the argument passed to the unsubscribe function.

```ts
import { Datastore } from "./some-datastore.js";

let store = new Datastore();

function subscribe(callback): number {
	return store.subscribe(callback);
}

function unsubscribe(results: number): void {
	store.unsubscribe(results);
}

export { store, subscribe, unsubscribe };
```

### Controller

Add a `Subscription` controller to a web component. Pass subscribe, unsubscribe, and callback functions on instantiation.

```ts
import { Subscription } from "wctk";
import { getState, subscribe, unsubscribe } from "./datastore.js";

class MyElement extends HTMLElement {
	#sc = new Subscription({
		host: this,
		callback: this.#update,
		connected: true,
		subscribe,
		unsubscribe,
	});

	#update() {
		let state = getState();
		// do something with state
	}
}
```

### Life cycle methods

In the example below the `connected` property is not included and has a fallback value of `false`.

The `Subscription` controller should be called on the component's `connect` and `disconnect` lifecycle methods:

```ts
import { Subscription } from "wctk";
import { getState, subscribe, unsubscribe } from "./datastore.js";

class MyElement extends HTMLElement {
	#sc = new Subscription({
		host: this,
		callback: this.#update,
		subscribe,
		unsubscribe,
	});

	// lifecycle method
	connectedCallback() {
		this.#sc.connect();
		this.#update();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#sc.disconnect();
	}

	#update() {
		let state = getState();
		// do something with state
	}
}
```
