# Component

This module is for build confirmations with controllers.

## Minimal Web Component

from [this](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) mdn example.

Web Components have a defined lifecycle.

```js
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["some", "attribute"];

  constructor() {
    super();
    // find out if unhydrated shadow root exists
    // add event listeners
    // subscribe to data store
  }

  connectedCallback() {
    // add event listeners
    // subscribe to data store
  }

  disconnectedCallback() {
    // unsubscribe to datastores
    // remove event listeners
  }

  adoptedCallback() {
    // called when stuff switches
    // useful for FLIP transitions
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // external state barrier
    // updated by JS (intentional)
  }
}
```

## Reactivity

After this initial, required, and inescapable inheritance, wolfpup can't do more inheritance ;\_;

Controllers are compositional. What defines an "render" is ambiguous.

This is the smallest reactive pattern I can think of without sinking time into extra libraries is a "controller" patterns for renders.

All that matters is there is a render method on the component class.

```js
class WctkComponent extends HTMLElement {
  #rc = new Render(this);

  attributeChangedCallback() {
    this.#rc.render();
  }

  render() {
    if (this.#rc.queued) return;
    // do something, i dunno what stack people use who cares
  }
}
```

## Render Controller

450 byte reactivity in web components
