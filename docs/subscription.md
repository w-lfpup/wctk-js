# Subscribe Controller

Subscribe web components to external state.

## How to use

### Callbacks

Create callback functions that subscribe and unsubscribe an element from a data store.

The results of the subscribe function are the arguments provided to the unsubscribe function.

```ts
import { Datastore } from "./some-datastore.js";

let store = new Datastore();

function subscribe(callback) {
	return store.subscribe(callback);
}

function unsubscribe(results): void {
	store.unsubscribe(results);
}

export { store, subscribe, unsubscribe };
```

### Controller

Add a `Subscription` controller to a web component, pass a callback, and subscribe and unsubscribe functions on instantiation.

The `Subscription` controller example below participates in web component lifecycle methods.

```ts
import { Subscription } from "wctk";
import { datastore, subscribe, unsubscribe } from "./my-store.js";

class MyElement extends HTMLElement {
	#sc = new Subscription({
		bind: this,
		callback: this.#update,
		subscribe,
		unsubscribe,
	});

	#update() {
		let state = datastore.getState();
		// do something with state
	}

	// lifecycle method
	connectedCallback() {
		this.#sc.connect();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#sc.disconnect();
	}
}
```
