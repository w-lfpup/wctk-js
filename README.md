# Wctk-JS

A web component tool kit.

## About

All features are entirely optional and compositional and built from the ground up to support SSR. There are no base classes or decorators.

A handful of controllers help developers:

- create [shadow dom](./docs/wc.md) and manage form values
- listen to [events](./docs/events.md)
- render on the [microtask](./docs/microtask.md) queue
- [query](./docs/query_selector.md) the shadow dom
- [subscribe](./docs/subscription.md) to external data stores
- [bind](./docs/bind.md) functions to elements

`Wctk-js` even supports `#private` functions as callbacks, fully encapsulating a web component's API (aside from required [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)).

## Install

```bash
npm install --save-dev https://github.com/w-lfpup/wctk-js/
```

## Examples

### SSR (server side rendering)

The following examples demonstrate several common SSR use cases:

- a [counter](https://w-lfpup.github.io/wctk-js/examples/counter/) with initial state in the DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/counter/)).
- a [stopwatch](https://w-lfpup.github.io/wctk-js/examples/stopwatch/) with initial state in the Shadow DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/stopwatch/)).
- a [form associated](https://w-lfpup.github.io/wctk-js/examples/form_associated/) element ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/form_associated/)).

## License

`Wctk-js` is released under the BSD-3 Clause License.
