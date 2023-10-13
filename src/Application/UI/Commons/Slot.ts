import VNode from "./VNode";

class Slot {
    name: string;
    node: VNode;

    constructor(name: string = "", node: VNode) {
        this.name = name;
        this.node = node;
    }


}

export default Slot;