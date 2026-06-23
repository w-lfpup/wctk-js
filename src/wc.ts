export interface WcElementInterface {
	attachInternals: HTMLElement["attachInternals"];
	attachShadow: Element["attachShadow"];
}

type FormValueArgs = Parameters<ElementInternals["setFormValue"]>;

export interface WcParamsInterface {
	host: WcElementInterface;
	adoptedStyleSheets?: CSSStyleSheet[];
	shadowRootInit?: ShadowRootInit;
	formValue?: FormValueArgs[0];
	formState?: FormValueArgs[1];
}

export interface WcInterface {
	readonly declarative: boolean;
	readonly shadowRoot: ShadowRoot;
	adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
	setFormValue: ElementInternals["setFormValue"];
	setValidity: ElementInternals["setValidity"];
	reportValidity: ElementInternals["reportValidity"];
}

const shadowRootInitFallback: ShadowRootInit = {
	mode: "closed",
};

export class Wc implements WcInterface {
	#declarative: boolean = false;
	#internals: ElementInternals;
	#shadowRoot: ShadowRoot;

	constructor(params: WcParamsInterface) {
		let { adoptedStyleSheets, host, formState, formValue, shadowRootInit } =
			params;

		this.#internals = host.attachInternals();
		this.#declarative = null !== this.#internals.shadowRoot;
		this.#shadowRoot =
			this.#internals.shadowRoot ??
			host.attachShadow(shadowRootInit ?? shadowRootInitFallback);

		this.adoptedStyleSheets = adoptedStyleSheets ?? [];
		if (formValue) this.setFormValue(formValue, formState);
	}

	get declarative(): boolean {
		return this.#declarative;
	}

	get shadowRoot(): ShadowRoot {
		return this.#shadowRoot;
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#shadowRoot.adoptedStyleSheets ?? [];
	}

	set adoptedStyleSheets(stylesheets: CSSStyleSheet[]) {
		this.#shadowRoot.adoptedStyleSheets = stylesheets;
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}

	reportValidity(): boolean {
		return this.#internals.reportValidity();
	}

	setFormValue(value: FormValueArgs[0], state?: FormValueArgs[1]) {
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
