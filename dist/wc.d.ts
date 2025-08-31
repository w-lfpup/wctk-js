export interface WcElementInterface {
    attachInternals: HTMLElement["attachInternals"];
    attachShadow: Element["attachShadow"];
}
type FormDataArguments = Parameters<ElementInternals["setFormValue"]>;
export interface WcParamsInterface {
    host: WcElementInterface;
    adoptedStyleSheets?: CSSStyleSheet[];
    shadowRootInit?: ShadowRootInit;
    formValue?: FormDataArguments[0];
    formState?: FormDataArguments[1];
}
export interface WcInterface {
    readonly declarative: boolean;
    readonly shadowRoot: ShadowRoot;
    adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
    setFormValue: ElementInternals["setFormValue"];
    setValidity: ElementInternals["setValidity"];
    reportValidity: ElementInternals["reportValidity"];
}
export declare class Wc implements WcInterface {
    #private;
    constructor(params: WcParamsInterface);
    get declarative(): boolean;
    get shadowRoot(): ShadowRoot;
    get adoptedStyleSheets(): CSSStyleSheet[];
    set adoptedStyleSheets(stylesheets: CSSStyleSheet[]);
    checkValidity(): boolean;
    reportValidity(): boolean;
    setFormValue(value: FormDataArguments[0], state?: FormDataArguments[1]): void;
    setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}
export {};
