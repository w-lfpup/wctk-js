# Web Component Controller

Wrangle the shadow dom!

## Api

### Properties:

- elementInternals -> `ElementInternals`
- declarative -> `boolean`
- shadowRoot -> `ShadowRoot`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit): void`

## How to use

Add a `WebComponent` controller to wrangle the shadow dom.

Check if the shadow dom is `declarative` in the `constructor`. If the shadow dom is not declarative, compose a dom fragment and append the dom fragment onto the shadow root. Otherwise, add event listeners to the existing declarative shadow dom.

```ts
import { WebComponent } from "wctk";

class MyElement extends HTMLElement {
    #wc = new WebComponent(this, { mode: "closed" });

    constructor() {
        super();

        if !this.#wc.declarative {
            // compose and append DOM to this.#sd.shadowRoot
        }

        // add event listeners to DOM
    }
}
```

## Details

The `WebComponent` controller inspects a custom element for declarative shadow dom. A shadow dom is created if a declarative shadow dom is not found.
