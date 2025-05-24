// needed because typescript itself does not create a similar type
type FormDataTypes = File | string | FormData;

interface WcElementInterface {
	attachInternals: HTMLElement["attachInternals"];
	attachShadow: Element["attachShadow"];
}

interface WcParamsInterface {
	host: WcElementInterface;
	adoptedStyleSheets?: CSSStyleSheet[];
	shadowRootInit?: ShadowRootInit;
	formValue?: FormDataTypes;
	formState?: FormDataTypes;
}

interface WcInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot | null;
	adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

const shadowRootInitFallback: ShadowRootInit = {
	mode: "closed",
};

class Wc implements WcInterface {
	#internals: ElementInternals;
	#declarative: boolean;

	constructor(params: WcParamsInterface) {
		let { host } = params;
		this.#internals = host.attachInternals();
		this.#declarative = null !== this.#internals.shadowRoot;

		if (!this.#declarative) {
			let { shadowRootInit, formValue, formState } = params;

			host.attachShadow(shadowRootInit ?? shadowRootInitFallback);
			if (formValue) this.setFormValue(formValue, formState);
		}

		let { adoptedStyleSheets } = params;
		if (adoptedStyleSheets) this.adoptedStyleSheets = adoptedStyleSheets;
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot | null {
		return this.#internals.shadowRoot;
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#internals.shadowRoot?.adoptedStyleSheets ?? [];
	}

	set adoptedStyleSheets(stylesheets: CSSStyleSheet[]) {
		let { shadowRoot } = this.#internals;
		if (shadowRoot) shadowRoot.adoptedStyleSheets = stylesheets;
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity(): boolean {
		return this.#internals.reportValidity();
	}

	setFormValue(value: FormDataTypes, state?: FormDataTypes) {
		this.#internals.setFormValue(value, state);
	}

	setValidity(
		flags?: ValidityStateFlags,
		message?: string,
		anchor?: HTMLElement,
	) {
		this.#internals.setValidity(flags, message, anchor);
	}
}

export type { WcInterface, WcElementInterface, WcParamsInterface };

export { Wc };
