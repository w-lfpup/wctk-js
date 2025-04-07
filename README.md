# The Web Component Tool Kit

Build web components with bare metal browser tools.

No dependencies. No inheritance.

(~3kb unminified uncompressed).

## Install

```bash
npm install --save-dev https://github.com/wolfpup-software/wctk-js
```

## Controllers

A handful of facades let developers:

- create [shadow dom](./docs/wc.md)
- [bind](./docs/bind.md) functions to elements
- listen to [events](./docs/events.md)
- [subscribe](./docs/subscription.md) to external data
- add renders to the [micro task](./docs/microtask.md) queue

## Examples

Click [here](https://wolfpup-software.github.io/wctk-js/examples/) for live examples.

## DevX

I'm a former member of the Lit and Material teams at google.

I hate decorators. I hate unnecessary inheritance. I like to avoid constructors when I can.

I want to encapsulate web components entirely (aside from lifecycle methods). I want to work with private functions.

Unfortunately not a single web component library lets me do that. So I made my own.

Hope it helps.

## License

`Wctk` is released under the BSD-3 Clause License.
