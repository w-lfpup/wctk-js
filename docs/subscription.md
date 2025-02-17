# Subscribe Controller

Subscribe web components to external state.

## Api

Properties:

- N/A

Methods:

- constructor -> `<E, A>(el: E, subscribe: () => A, unsubscribe: (results: A) => {}): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add a `Subscription` controller to a web component.

Provide functions to subscribe and unsubscribe from a data store.

### IMPORTANT

The results of a subscribe function are passed as arguments of an unsubscribe function

```ts
import { Subscription } from "wctk";
import { store } from "./my-store.js";

class MyElement extends HTMLElement {
	#sb = new Subscribe(this, subscribeToStore, unsubscribeToStore);

	connectedCallback() {
		this.#sb.connect();
	}

	disconnectedCallback() {
		this.#sb.disconnect();
	}
}

function subscribeToStore(el: MyElement): number {
	return store.subscribe(() => {
		// do stuff here!
	});
}

function unsubscribeToStore(el: MyElement, results: number): void {
	store.unsubscribe(results);
}
```
