# Render Controller

Asyncronous renders for web components.

## Api

Properties:

- queued -> `bool`

Methods:

- constructor -> `(HtmlElement): void`
- render -> `void`

## How to use

Add a `render` controller to a web component.

In the `attributeChangedCallback` method (or wherever appropriate) call `#rc.render()`;

```ts
import { Render } from "wctk";

class MyElement extends HTMLElement {
	static observedAttributes = ["color", "size"];

	#rc = new Render(this);

	attributeChangedCallback() {
		this.#rc.render();
	}

	render() {
		// no need to render if a render is queued!
		if (this.#rc.queued) return;
		
		// do something here!
	}
}
```

### Details

The `Redner.render()` method can be called multiple times but the corresponding `Element.render()` method will only be called _once_ per event loop.

It's a kind of asyncronous rendering using the `microtaskQueue`.