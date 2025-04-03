# Wc Controller

Build a web component.

## How to use

Add a `Wc` controller to a custom element.

```ts
import { Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc(this);
}
```

The `Wc` controller directly directly mirrors bare metal browser apis.

It collects a few core web componet APIs into a concice facade pattern.

```ts
class MyElement extends HTMLElement {
	// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#options
	#wc = new Wc(this, { mode: "open" });

	constructor() {
		// true if declarative shadow dom is present
		this.#wc.delcarative;

		// https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets
		this.#wc.adopedStylesheets;

		// https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
		this.#wc.shadowRoot;

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity
		this.#wc.checkValidity();

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity
		this.#wc.reportValidity();

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
		this.#wc.setFormValue(value, state);

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity
		this.#wc.setValidity(flags, message);
	}
}
```
