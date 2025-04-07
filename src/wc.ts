interface WcInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
	adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

type FormDataTypes = File | string | FormData | null;

interface WcElementInterface {
	attachInternals: HTMLElement["attachInternals"];
	attachShadow: Element["attachShadow"];
}

const shadowRootInitFallback: ShadowRootInit = {
	mode: "closed",
};

interface WcParams {
	host: HTMLElement;
	adoptedStyleSheets?: CSSStyleSheet[];
	shadowRootInit?: ShadowRootInit;
	formValue?: FormDataTypes;
	formState?: FormDataTypes;
}

// adoptedStylesheets
//

class Wc implements WcInterface {
	#internals: ElementInternals;
	#declarative: boolean;

	constructor(
		params: WcParams,
	) {
		let {host} = params;
		this.#internals = host.attachInternals();
		this.#declarative = this.#internals.shadowRoot !== null;

		if (!this.#declarative) {
			let shadowRootInit = params.shadowRootInit ?? shadowRootInitFallback;
			host.attachShadow(shadowRootInit);
		}

		let {adoptedStyleSheets} = params;
		if (adoptedStyleSheets) this.adoptedStyleSheets = adoptedStyleSheets;

		let {formValue, formState} = params;
		if (formValue || null === formValue) {
			formState = (formState || null === formState)
				? formState
				: formValue;
				
			this.setFormValue(formValue, formState);
		}
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot {
		return this.#internals.shadowRoot;
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#internals.shadowRoot.adoptedStyleSheets;
	}

	set adoptedStyleSheets(stylesheets: CSSStyleSheet[]) {
		this.#internals.shadowRoot.adoptedStyleSheets = stylesheets;
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

export type { WcInterface, WcElementInterface };

export { Wc };
