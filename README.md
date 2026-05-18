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

## Create a Web Component

Add a `Wc` controller to a custom element with only one line

```ts
import { Wc } from "wctk";

class MyElement extends HTMLElement {
	#wc = new Wc({ host: this });
}

customElements.define("my-element", MyElement);
```

## Examples

### SSR (server side rendering)

The following examples demonstrate several common SSR use cases:

- a [counter](https://w-lfpup.github.io/wctk-js/examples/counter/) with initial state in the DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/counter/)).
- a [stopwatch](https://w-lfpup.github.io/wctk-js/examples/stopwatch/) with initial state in the Shadow DOM ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/stopwatch/)).
- a [form associated](https://w-lfpup.github.io/wctk-js/examples/form_associated/) element ([code](https://github.com/w-lfpup/wctk-js/tree/main/examples/form_associated/)).

## Design Goals

If you know vanilla javascript and the DOM you are good to go.

The majority of components only have a few moving pieces. Do you really need templating or flux-patterns
or tree-walks for your super cool custom button? Do you really need a framework for that checkbox?

The `wctk` is a collection of bare-metal facades over vanilla browser apis. They provide the basics for events, reactivity, and forms.

AFAIK `wctk` is the ONLY web component library built with SSR and declarative shadow dom in mind. Developers
can pick-up what the HTML threw down and immediately create interactive SSR friendly web components.

## License

`Wctk-js` is released under the BSD-3 Clause License.
