# Subscribe Controller

Subscribe web components to external state.

## How to use

### Callbacks

Prepare callbacks that subscribe and unsubscribe an element from a data store.

Some datastores provide these callbacks but the main hurdle is to make sure the
result of the `subscribe` function is passed as the to the `unsubscribe` function.

```ts
import { Datastore } from "./some-datastore.js";

export const store = new Datastore();
// store.getState();
// store.subscribe(callback): receipt;
// store.unsubscribe(receipt);
```

### Controller

Add a `Subscription` controller to a web component. Pass subscribe, unsubscribe, and a callback function on instantiation.

```ts
import { Subscription } from "wctk";
import { store } from "./datastore.js";

let { subscribe, unsubscribe } = store;

class MyElement extends HTMLElement {
	#sc = new Subscription({
		callback: this.#update.bind(this),
		subscribe,
		unsubscribe,
	});

	#update() {
		let state = store.getState();
		// do something with state
	}

	// lifecycle method
	connectedCallback() {
		this.#sc.connect();
		this.#update();
	}

	// lifecycle method
	disconnectedCallback() {
		this.#sc.disconnect();
	}
}
```

### Shortcut life cycle methods

In the example below, the `connected` property is set to true and the component is immediately subscribed on instantiation.

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
