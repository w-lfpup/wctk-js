# Wctk-JS

An SSR friendly (w)eb(c)omponent (t)ool (k)it without dependencies.

[![Builds](https://github.com/w-lfpup/wctk-js/actions/workflows/builds.yml/badge.svg)](https://github.com/w-lfpup/wctk-js/actions/workflows/builds.yml)

## About

There are no base classes, decorators, or mixins.

All features are compositional and designed for SSR and [declarative shadow dom](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html).

Four (4) controllers help developers:

- manage [shadow dom](./docs/wc.md) and [form values](./docs/wc.md#adopted-stylesheets-and-form-values)
- render on the [microtask queue](./docs/microtask.md)
- listen for [events](./docs/events.md)
- cache selector [queries](./docs/query_selector.md)

All controllers (aside from the WC controller) are extremely flexible and not restricted to web components. The can be used on any `HTMLElement`.

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
