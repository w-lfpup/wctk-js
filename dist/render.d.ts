interface RenderInterface {
    readonly queued: boolean;
    render(): void;
}
interface RenderElementInterface {
    render(): void;
}
declare class Render implements RenderInterface {
    #private;
    constructor(el: RenderElementInterface);
    get queued(): boolean;
    render(): void;
}
export type { RenderElementInterface, RenderInterface };
export { Render };
