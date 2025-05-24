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
declare class Wc implements WcInterface {
    #private;
    constructor(params: WcParamsInterface);
    get declarative(): boolean;
    get shadowRoot(): ShadowRoot | null;
    get adoptedStyleSheets(): CSSStyleSheet[];
    set adoptedStyleSheets(stylesheets: CSSStyleSheet[]);
    checkValidity(): boolean;
    reportValidity(): boolean;
    setFormValue(value: FormDataTypes, state?: FormDataTypes): void;
    setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}
export type { WcInterface, WcElementInterface, WcParamsInterface };
export { Wc };
