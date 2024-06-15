# Subscribe Controller

Add stylesheets to a shadow root.

## Api

### Methods

- constructor -> `(ShadowRoot, (CssStylesheet | string)[]): void`;

## How to use

Add a `shadow` controller to a web component called `#sd` and pass a shadow root and an array of styles on construction.

```ts
import { Styles } from "./render/dist/mod.js";

const fontStyles = `
    :root {
        color: darkblue;
    }
`;

const layoutStyles = new CSSStyleSheet();
layoutStyles.replaceSync(`
    :host {
        color: lightgrey;
    }
`);

class MyElement extends HTMLElement {
    #sd = new Styles(this, [fontStyles, layoutStyles]);
}

export { MyElement };
```

### Declarative shadow dom

An `addStyles` function is provided in case a controller is not needed or convenient.

In the example below, stylesheets are added to the shadow root _only_ if the shadow root is not declarative.

```ts
import { addStyles } from "./render/dist/mod.js";

const fontStyles = `
    :root {
        color: darkblue;
    }
`;

const layoutStyles = new CSSStyleSheet();
layoutStyles.replaceSync(`
    :host {
        color: lightgrey;
    }
`);

class MyElement extends HTMLElement {
    #sd = new Shadow(this, { mode: "closed" });

    constructor() {
        super();

        if this.#sd.declarative {
            // add event listeners to #this.sd.shadowRoot
        } else {
            // compose DOM and append to #this.sd.shadowRoot
            addStyles(this.#sd.shadowRoot, [fontStyles, layoutStyles]);
        }
    }
}

export { MyElement };
```

## About

The `Shadow` controller inspects an element for declarative shadow dom.

A new shadow dom is created if a declarative shadow dom is not found.
