interface WcInterface {
    readonly declarative: boolean;
    readonly shadowRoot: ShadowRoot;
    adoptedStyleSheets: ShadowRoot["adoptedStyleSheets"];
    setFormValue: ElementInternals["setFormValue"];
    setValidity: ElementInternals["setValidity"];
    reportValidity: ElementInternals["reportValidity"];
}
interface WcElementInterface {
    attachInternals: HTMLElement["attachInternals"];
    attachShadow: HTMLElement["attachShadow"];
}
declare class Wc implements WcInterface {
    #private;
    constructor(el: WcElementInterface, init?: ShadowRootInit);
    get declarative(): boolean;
    get shadowRoot(): ShadowRoot;
    get adoptedStyleSheets(): CSSStyleSheet[];
    set adoptedStyleSheets(stylesheets: CSSStyleSheet[]);
    setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void;
    setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
    reportValidity(): boolean;
}
export type { WcInterface, WcElementInterface };
export { Wc };
