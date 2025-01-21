# Wc Controller

Build a web component!

## Api

### Properties:

- declarative (read only) -> `boolean`
- shadowRoot (read only) -> `ShadowRoot`
- adoptedStylesheets -> `CSSStylesheets[]`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit): void`

## How to use

Add a `Wc` controller to wrangle the shadow dom.

Check if the shadow dom is `declarative` in the `constructor`. If the shadow dom is not declarative, compose a dom fragment and append the dom fragment onto the shadow root. Otherwise, add event listeners to the existing declarative shadow dom.

```ts
import { Wc } from "wctk";

class MyElement extends HTMLElement {
    #wc = new Wc(this, { mode: "closed" });

    constructor() {
        super();

        if this.#wc.declarative {
            // declarative DOM  exists
        }

    }
}
```

## Details

The `Wc` controller inspects a custom element for declarative shadow dom. A shadow dom is created if a declarative shadow dom is not found.
