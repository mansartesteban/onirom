import Registry from "@/Application/Commons/Registry";
import VNode from "./VNode";
import VNodeRegistry from "./VNodeRegistry";
import NodeId from "./NodeId";

class VMount {

    target: string | VNode | NodeId;

    constructor(target: string | VNode | NodeId | Element) {
        if (target instanceof Element) {
            target = target.getAttribute("uuid") || "";
        }
        this.target = target;
    }

    getNode(): VNode | undefined {
        let target = this.target;
        if (target instanceof VNode) {
            return target;
        }

        if (typeof target === "string") {
            let element = document.querySelector(target);
            target = element ? (element.getAttribute("uuid") || "") : target;
        } else if (target instanceof NodeId) {
            target = target.id;
        }
        let nodeRegistry = Registry.get("vnode") as VNodeRegistry;
        let node = nodeRegistry.get(target);
        return node;
    }

    getElement(): Element {
        if (typeof this.target === "string") {
            return document.querySelector(this.target) ?? (document.body as Element);
        } else {
            return this.getNode()?.dom ?? (document.body as Element);
        }
    }

}

export default VMount;