# Shadow Root Controller

Wrangle the shadow dom!

## Api

### Properties:

- internals -> `ElementInternals`
- declarative -> `boolean`
- shadowRoot -> `ShadowRoot`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit): void`

## How to use

Add a `shadow` controller to a web component called `#sd`.

```js
import { Shadow } from "./render/dist/mod.js";

class MyElement extends HTMLElement {
	#sd = new Shadow(this, { mode: "closed" });
}

export { MyElement };
```

## About

The `Shadow` controller inspects an element for declarative shadow dom.

A new shadow dom is created if a declarative shadow dom is not found.
