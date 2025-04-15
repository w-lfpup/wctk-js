# The Web Component Tool Kit

Build web components with bare metal browser tools.

## About

`WCTK-js` is the most concise way to create web components:

- No decorators
- No (unncessary) inheritance
- No extra dependencies

`WCKT-js` provides support for:

- SSR
- Reactivity
- Events
- Forms
- Subscriptions

All features are optional and compositional.

`WCTK-js` even supports `#private` functions as callbacks for event listerners and data stores. This fully encapsulates a web component API (aside from required [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)).

## Install

```bash
npm install --save-dev https://github.com/w_lfpup/wctk-js
```

## Controllers

A handful of facades let developers:

- create [shadow dom](./docs/wc.md) and manage form values
- listen to [events](./docs/events.md)
- [subscribe](./docs/subscription.md) to external data stores
- push actions like "renders" to the [micro task](./docs/microtask.md) queue
- [bind](./docs/bind.md) functions to elements

## Examples

### SSR (server side rendering)

The following examples demonstrate several common SSR use cases:

- a [counter](https://w_lfpup.github.io/wctk-js/examples/counter/) that queries the DOM for initial state ([code](https://github.com/wolfpup-software/wctk-js/tree/main/examples/counter/)).
- a [stopwatch](https://w_lfpup.github.io/wctk-js/examples/stopwatch/) that queries the Shadow DOM for initial state ([code](https://github.com/wolfpup-software/wctk-js/tree/main/examples/stopwatch/)).
- a [form associated element](https://w_lfpup.github.io/wctk-js/examples/form_associated/) ([code](https://github.com/wolfpup-software/wctk-js/tree/main/examples/form_associated/)).

## License

`Wctk` is released under the BSD-3 Clause License.
