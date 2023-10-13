interface IVNode {
    render(parent: VNode);
}

type TProps = {
    [name: string]: any;
};

type TRenderableElement = string | Element | VNode;