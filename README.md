# Wctk-JS

A web component tool kit.

[![Builds](https://github.com/w-lfpup/wctk-js/actions/workflows/builds.yml/badge.svg)](https://github.com/w-lfpup/wctk-js/actions/workflows/builds.yml)

## About

A half-dozen controllers help developers:

- create [shadow dom](./docs/wc.md)
- render on the [microtask queue](./docs/microtask.md)
- listen for [events](./docs/events.md)
- [subscribe](./docs/subscription.md) to external data stores
- manage [form values](./docs/wc.md#adopted-stylesheets-and-form-values)
- [query](./docs/query_selector.md) the shadow dom
- [bind](./docs/bind.md) functions to elements

All features are compositional and built to support [declarative shadow dom](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html) SSR.

There are no base classes or decorators.

`Wctk-js` even supports `#private` methods as callbacks, fully encapsulating a web component's API (aside from required [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)).

## Install

Install with npm.

```bash
npm install --save-dev @w-lfpup/wctk
```

Or install directly from github.

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
