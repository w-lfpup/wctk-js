# QuerySelector Controller

Create a map of selector queries.

## How to use

Add a `QuerySelector` controller to a web component.

Add a list of callbacks on instantiation.

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
		host: this.#wc.shadowRoot,
		selectors: [["hello_world", "[greeting]"]],
	});

	doSomething() {
		// first occurance
		let helloWorld = this.#qc.get("hello_world");

		// NodeList
		let allTheHelloWorlds = this.#qc.getAll("hello_world");

		// update queries
		this.#qc.query();
	}
}
```
