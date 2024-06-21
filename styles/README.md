# Styles Controller

Add stylesheets to a shadow root.

## Api

### Methods

- constructor -> `(ShadowRoot, (CssStylesheet | string)[]): void`;

## How to use

Add a `Styles` controller to a web component.

Pass a shadow root and an array of styles on construction.

```ts
import { Shadow, Styles } from "https://raw.githubusercontent.com/wolfpup-software/wctk-js/main/wctk/dist/wctk.js";

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
    #sd = new Shadow(this, {mode: "closed"});
    #st = new Styles(this.#sd.shadowRoot, [fontStyles, layoutStyles]);
}
```

### Declarative shadow dom

In the example below, stylesheets are added to the shadow root _only_ if the shadow root is not declarative.

```ts
import { Shadow, Styles } from "https://raw.githubusercontent.com/wolfpup-software/wctk-js/main/wctk/dist/wctk.js";

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
    #st = new Styles(this.#sd.shadowRoot, []);

    constructor() {
        super();

        if !this.#sd.declarative {
            // compose DOM and append to #this.sd.shadowRoot
            this.#st.adoptedStyleSheets = [fontStyles, layoutStyles]);
        }

        // add event listeners to #this.sd.shadowRoot
    }
}
```

## Details

The `Styles` controller will create a `CSSStylesheet` from raw strings.
