# Bind Controller

Bind functions to objects.

This utility is mainly designed to avoid using the constructor.

## How to use

Add a `Bind` controller to a web component.

Add a list of methods on instantiation. The methods cannot be `#private`.

```ts
import { Bind } from "wctk";

class MyElement extends HTMLElement {
	#bc = new Bind({
		host: this,
		callbacks: [this.elementCallback],
	};

	elementCallback(e: KeyboardEvent) {
		// This function can be passed as a callback to event listeners now!
	}
}
```
