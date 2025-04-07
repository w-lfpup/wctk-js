type FormDataTypes = File | string | FormData | null;
interface WcElementInterface {
    attachInternals: HTMLElement["attachInternals"];
    attachShadow: Element["attachShadow"];
}
interface WcParams {
    host: WcElementInterface;
    adoptedStyleSheets?: CSSStyleSheet[];
    shadowRootInit?: ShadowRootInit;
    formValue?: FormDataTypes;
    formState?: FormDataTypes;
}
interface WcInterface {
    readonly declarative: boolean;
    readonly shadowRoot: ShadowRoot;
    adoptedStyleSheets: DocumentOrShadowRoot["adoptedStyleSheets"];
    setFormValue: ElementInternals["setFormValue"];
    setValidity: ElementInternals["setValidity"];
    reportValidity: ElementInternals["reportValidity"];
}
declare class Wc implements WcInterface {
    #private;
    constructor(params: WcParams);
    get declarative(): boolean;
    get shadowRoot(): ShadowRoot;
    get adoptedStyleSheets(): CSSStyleSheet[];
    set adoptedStyleSheets(stylesheets: CSSStyleSheet[]);
    checkValidity(): boolean;
    reportValidity(): boolean;
    setFormValue(value: FormDataTypes, state?: FormDataTypes): void;
    setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}
export type { WcInterface, WcElementInterface };
export { Wc };
