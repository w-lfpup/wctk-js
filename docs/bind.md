# Bind Controller

Bind functions to objects.

This is mostly a utility to avoid using the constructor.

## How to use

Add a `Bind` controller to a web component.

Add a list of callbacks on instantiation.

```ts
import { Bind } from "wctk";

class MyElement extends HTMLElement {
	#bc = new Bind(this, [this.elementCallback];

	elementCallback(e: KeyboardEvent) {
		// This function can be passed as a callback to event listeners now!
	}
}
```
