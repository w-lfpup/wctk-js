import { Wc } from "../../dist/mod.js";

class WcDeclarativeElement extends HTMLElement {
	#wc = new Wc({ host: this });

	get delcarative(): boolean {
		return this.#wc.declarative;
	}
}

window.customElements.define("declarative-element", WcDeclarativeElement);

let testEl: WcDeclarativeElement | undefined;
let declarativeEl: WcDeclarativeElement | undefined;

function setup() {
	document.body.setHTMLUnsafe(`
		<declarative-element></declarative-element>
		<declarative-element data-declarative>
			<template shadowrootmode="open">
				<p>howdy!</p>
			</template>
		</declarative-element>
	`);

	[testEl, declarativeEl] = document.querySelectorAll<WcDeclarativeElement>(
		"declarative-element",
	);
}

function testDeclarativeShadowDomDoesNotExist() {
	if (!testEl) return "failed to query declarative-element";
	if (testEl.delcarative)
		return "element incorrectly labelled as declarative";
}

function testDeclarativeShadowDomExists() {
	if (!declarativeEl)
		return "failed to query declarative-element with declarative shadow dom";
	if (!declarativeEl.delcarative)
		return "element incorrectly labelled as not declarative";
}

export const tests = [
	setup,
	testDeclarativeShadowDomExists,
	testDeclarativeShadowDomDoesNotExist,
];

export const options = {
	title: import.meta.url,
};
