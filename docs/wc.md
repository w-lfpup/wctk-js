# Wc Controller

Build a web component.

## How to use

Add a `Wc` controller to a custom element.

One line is all it takes.

```ts
import { Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ host: this });
}
```

## Adopted stylesheets and form values

The `Wc` controller is also a facade for a few core web componet APIs including stylesheets and form values.

```ts
class MyElement extends HTMLElement {
	#wc = new Wc({
		host: this,
		// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#options
		shadowRootInit: { mode: "open" },
		adoptedStyleSheets: [],
		formValue: "^_^",
		formState: ":3",
	});

	showcaseApi() {
		// true if declarative shadow dom is present
		this.#wc.delcarative;

		// https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
		this.#wc.shadowRoot;

		// https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets
		this.#wc.adopedStylesheets;

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setFormValue
		this.#wc.setFormValue(value, state);

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity
		this.#wc.checkValidity();

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity
		this.#wc.reportValidity();

		// https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity
		this.#wc.setValidity(flags, message);
	}
}
```
