interface IVNode {
    renderer: NodeRenderer;
    render(parent: VNode);
}

type TProps = {
    [name: string]: any?;
};

type TElementProps = {
    id?: string,
    classes?: string[],
    attributes?: TElementAttribute[],
};

type TElementAttribute = {
    name: string,
    value?: string;
};

type TEventListener = {
    name: string;
    callback: EventListenerOrEventListenerObject;
    attached: Boolean;
};

type TRenderableElement = string | Element | VNode;