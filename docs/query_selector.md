# QuerySelector Controller

Create a lazy map of selector queries.

## How to use

Add a `QuerySelector` controller to a web component.

```html
<my-element>
	<template shadowrootmode="closed">
		<span greeting>UwU</span>
	</template>
</my-element>
```

Every query is cached. Call `<QuerySelector>.deleteAll()` to reset the cache (helpful after a new render)

```ts
import { QuerySelector } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ host: this });
	#qc = new QuerySelector({
		parent: this.#wc.shadowRoot,
	});

	showcaseApi() {
		// first Element or undefined
		let greeting = this.#qc.querySelector("[greeting]");

		// Element[]
		let greetings = this.#qc.querySelectorAll("[greeting]");

		// create new cache
		this.#qc.deleteAll();
	}
}
```
