import { IRegistry } from "@/index";
import VNode from "./VNode";

class VNodeRegistry implements IRegistry {
    nodes: VNode[];
    id: string;

    constructor(id: string = "vnode") {
        this.id = id;
        this.nodes = [];
    }

    get(node: VNode | string) {
        let id = (node instanceof VNode) ? node.identifier : node;
        return this.nodes.find((vnode: VNode) => vnode.identifier === id);
    }

    remove(nodeToRemove: VNode | string) {
        let id = (nodeToRemove instanceof VNode) ? nodeToRemove.identifier : nodeToRemove;
        let indexToRemove = this.nodes.findIndex((vnode: VNode) => vnode.identifier === id);
        if (indexToRemove !== -1) {
            this.nodes.splice(indexToRemove, 1);
        }
    }

    register(nodes: VNode | VNode[]): void {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }
        this.nodes = this.nodes.concat(nodes);
    }

}

export default VNodeRegistry;