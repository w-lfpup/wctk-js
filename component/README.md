# Component

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

After this initial, required, and inescapable inheritance, wolfpup can't do more inheritance ;_;

Controllers are compositional. But they're restricted to OOP patters (public private methods). What defines an "update" is ambiguous. And needs to be defined by a dev with a callback or a method.

So a couple methods need to be defined regardless.

```js
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["some", "attribute"];

  constructor() {
    super();
  }

  ...

  // could ask for other methods
  onEvent(e) {
    // pick what event does what
    // broadcast event
    // decide to update!
  }
  update() {
    // decide to render!
  }
  render() {
    // render those things
  }
}
```

## Why

Based on experience at Lit, class based components and decorators gave the aesthetic of a streamlined api but the implementation felt weighty.

I added as much to a custom class that inherited from Lit than if I created my own custom element without inheritance. I had to learn which Lit specific properties corresponded to web component properties. I had to learn web components to understand Lit.

Implementations I saw across the web shared a common resource bundling problem. Where code is imported and run multiple times on a browser document. This results in multiple versions of the same library running in the same window. It could be react, lit, doesn't matter. It's related to bundling and client architecture.

So the api was cumbersome. The abstraction didn't abstract well enough (for my tastes). People were keen to misuse the product, most likely because they had to understand _two_ concurrent abstractions.

Meaning this pup didn't see an actual reason to use the product they were barking on at Google.