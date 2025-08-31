# QuerySelector Controller

Create a map of selector queries.

## How to use

Add a `QuerySelector` controller to a web component.

Add a list of selectors on instantiation.

```html
<my-element>
	<template shadowrootmode="closed">
		<span greeting>UwU</span>
	</template>
</my-element>
```

```ts
import { QuerySelector } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ host: this });
	#qc = new QuerySelector({
		target: this.#wc.shadowRoot,
		querySelector: ["[greeting]"],
		querySelectorAll: ["[greeting]"],
	});

	doSomething() {
		// first occurance
		let greeting = this.#qc.get("[greeting]");

		// NodeList
		let greetings = this.#qc.getAll("[greeting]");

		// update queries
		this.#qc.query();
	}
}
```
