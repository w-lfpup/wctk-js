# The Web Component Tool Kit

Build web components with bare metal browser tools.

## About

`WCTK-js` is the smallest and quickest way to create web components with:

- No decorators
- No (unncessary) inheritance
- No extra dependencies

All features are optional providing developers the opportunity to focus on features like:

- SSR
- Forms
- Reactivity

`WCTK-js` can use `#private` functions as callbacks for event listerners and external data stores. This means developers can (aside from required [life cycle](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) methods) encapsulate their web component API entirely.

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

Click [here](https://w_lfpup.github.io/wctk-js/examples/) for live examples.

## License

`Wctk` is released under the BSD-3 Clause License.
