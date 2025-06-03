# Slotted Controller

Get descendants of slot elements.

## How to use

Add a `Slotted` controller to a web component.

Provide a `target` on construction.

```html
<my-element>
	<template shadowrootmode="closed">
		<slot name="greeting">
			<span>AwwooOOO!</span>
		</slot>
	</template>
</my-element>
```

```ts
import { QuerySelector } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ host: this });
	#slc = new Slotted({
		target: this.#wc.shadowRoot,
	});

	doSomething() {
		let descendants = this.#slc.assignedNodes("greeting");
		let descedantElements = this.#slc.assignedElements("greeting");

		let spans = this.#slc.assignedInstances("greeting", HTMLSpanElement);
		let more_spans = this.#slc.assignedMatches("greeting", "span");

		// update queries
		this.#slc.query();
	}
}
```
