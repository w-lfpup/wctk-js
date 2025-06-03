# Wctk-JS

The web component tool kit.

## Install

```bash
npm install --save-dev https://github.com/w-lfpup/wctk-js/
```

## Controllers

A handful of facades:

- create [shadow dom](./docs/wc.md) and manage form values
- listen to [events](./docs/events.md)
- [subscribe](./docs/subscription.md) to external data stores
- push renders to the [microtask](./docs/microtask.md) queue
- [bind](./docs/bind.md) functions to elements
- [query](./docs/query_selector.md) the shadow dom
- list [slotted](./docs/query_selector.md) nodes

## Examples

### SSR (server side rendering)

The following examples demonstrate several common SSR use cases:

- a [counter](https://w-lfpup.github.io/wctk-js/examples/counter/) with initial state in the DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/counter/)).
- a [stopwatch](https://w-lfpup.github.io/wctk-js/examples/stopwatch/) with initial state in the Shadow DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/stopwatch/)).
- a [form associated](https://w-lfpup.github.io/wctk-js/examples/form_associated/) element ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/form_associated/)).

## About

`Wctk-js` is a concise way to create web components with:

- No decorators
- No (unncessary) inheritance
- No extra dependencies

`Wctk-js` provides support for:

- Reactivity
- SSR
- Events
- Forms
- Subscriptions

All features are optional and compositional.

`Wctk-js` supports `#private` functions as callbacks for event listerners and data stores. This fully encapsulates a web component API (aside from required [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)).

## License

`Wctk` is released under the BSD-3 Clause License.
