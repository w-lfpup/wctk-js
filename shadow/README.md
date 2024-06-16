# Shadow Root Controller

Wrangle the shadow dom in <500 bytes!

## Api

### Properties:

- internals -> `ElementInternals`
- declarative -> `boolean`
- shadowRoot -> `ShadowRoot`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit): void`

## How to use

Add a `Shadow` controller to wrangle the shadow dom.

Check if the shadow dom is `declarative` in the `constructor`. If the shadow dom exists, add event listeners. Otherwise compose a dom fragment, add event listeners, and project the dom fragment onto the shadow dom.

```ts
import { Shadow } from "https://raw.githubusercontent.com/wolfpup-software/wctk-js/main/wctk/dist/wctk.js";

class MyElement extends HTMLElement {
    static observerdAttributes = ["message", "color"];

    #sd = new Shadow(this, { mode: "closed" });

    constructor() {
        super();

        if this.#sd.declarative {
            // add event listeners to #this.sd.shadowRoot
        } else {
            // compose DOM and append to #this.sd.shadowRoot
        }
    }
}

customElements.define('my-element', MyElement);

export { MyElement };
```


## About

The `Shadow` controller inspects an element for declarative shadow dom.

A new shadow dom is created if a declarative shadow dom is not found.
