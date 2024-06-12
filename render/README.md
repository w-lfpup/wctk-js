# Render Controller

Asyncronous reactivity for web components in <500 bytes.

## Api

Properties:

- queued -> `bool`

Methods:

- constructor -> `(HtmlElement): void`
- render -> `void`

## How to use

Add a `render` controller to a web component with `observerdAttributes` called `#rc`.

On `attributeChangedCallback` (or wherever appropriate) call `#rc.render()`;

```ts
import { Render } from "./render/dist/mod.js";

class MyComponent extends HTMLElement {
	static observedAttributes = ["color", "size"];

	#rc = new Render(this);

	attributeChangedCallback() {
		this.#rc.render();
	}

	render() {
		// do something here!
	}
}

export { MyComponent };
```

### details

The `Redner.render()` method can be called multiple times but the corresponding `Element.render()` method will only be called _once_ per event loop.

It's a kind of asyncronous rendering.
