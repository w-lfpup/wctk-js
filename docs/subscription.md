# Subscribe Controller

Subscribe web components to external state.

## How to use

### Callbacks

Create callback functions that subscribe and unsubscribe an element from a data store.

The results of the subscribe function are the arguments to the unsubscribe function.

```ts
import { store } from "./my-store.js";

function subscribeToStore(el) {
	return store.subscribe(() => {
		// do stuff here!
	});
}

function unsubscribeToStore(el, results): void {
	store.unsubscribe(results);
}
```

### Controller

Add a `Subscription` controller to a web component and pass subscribe and unsubscribe functions on instantiation.

The `Subscription` controller example below participates in web component lifecycle methods.

```ts
import { Subscription } from "wctk";

class MyElement extends HTMLElement {
	#sc = new Subscribe(this, subscribeToStore, unsubscribeToStore);

	connectedCallback() {
		this.#sc.connect();
	}

	disconnectedCallback() {
		this.#sc.disconnect();
	}
}
```
