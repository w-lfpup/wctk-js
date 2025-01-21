# Wc Controller

Build a web component!

## Api

### Properties:

- declarative (read only) -> `boolean`
- shadowRoot (read only) -> `ShadowRoot`
- adoptedStylesheets -> `CSSStylesheets[]`

### Methods

- constructor -> `(HtmlElement, ShadowRootInit) => void`
- setFormValue -> `(value: File | string | FormData | null, state?: File | string | FormData | null) => void`
- setValidity -> `(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement) => void`
- reportValidity -> `() => boolean`

## How to use

Add a `Wc` controller to a custom element.

The `Wc` controller inspects a custom element for declarative shadow dom. A shadow dom is created if a declarative shadow dom is not found.

```ts
import { Wc } from "wctk";

class MyElement extends HTMLElement {
    #wc = new Wc(this, { mode: "closed" });

    constructor() {
        super();

        if this.#wc.declarative {
            // declarative DOM  exists
        } else {
            // otherwise build something
        }
    }
}
```
