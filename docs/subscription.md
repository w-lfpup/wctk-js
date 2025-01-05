# Subscribe Controller

Subscribe web components to external state.

## Api

Required Callbacks
- SubscribeFunction -> `(HtmlElement) -> Results`
- UnsubscribeFunction -> `(HtmlElement, Results) -> void`

Properties:
- N/A

Methods:
- constructor -> `(HtmlElement, SubscribeFunction, UnsubscribeFunction): void`
- connect -> `(): void`
- disconnect -> `(): void`

## How to use

Add a `Subscription` controller to a web component.

Provide functions to subscribe and unsubscribe from a data store.

In the example below, the functions are called `subscribeToStore` and `unsubscribeToStore`.

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

	render() {
		// use the store to update the element 
	}
}

function subscribeToStore(el: MyElement): number {
    return store.subscribe(() => {
		el.render();
    });
}

function unsubscribeToStore(el: MyElement, results: number): void {
    store.unsubscribe(results);
}
```

### Details

The results of a subscribe function are passed as arguments of an unsubscribe function