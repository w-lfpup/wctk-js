# Subscribe Controller

Subscribe web components to external state.

## How to use

### Callbacks

Create callback functions that subscribe and unsubscribe an element from a data store.

The results of the subscribe function are the arguments provided to the unsubscribe function.

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

Add a `Subscription` controller to a web component, pass a callback, and subscribe and unsubscribe functions on instantiation.

```ts
import { Subscription } from "wctk";
import { getState, subscribe, unsubscribe } from "./datastore.js";

class MyElement extends HTMLElement {
	#sc = new Subscription({
		host: this,
		callbacks: [this.#update],
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

The `Subscription` controller can participate in web component lifecycle methods.

In the example below the `connected` property is not included and has a fallback value of `false`.

The `Subscription` controller should be connected manually during the component's lifecycle methods:

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

	#update() {
		let state = getState();
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
