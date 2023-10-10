class VNode {

    props: { [name: string]: any; } = {};
    slots: { [name: string]: any; } = {};
    children: VNode[] = [];

    refresh() { }
    render(parent: Element) { }

}

export default VNode;