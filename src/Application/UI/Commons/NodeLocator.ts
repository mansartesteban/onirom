import UI from "../main";
import VMount from "./VMount";
import VNode from "./VNode";

class NodeLocator {
    location?: VMount;

    constructor(location?: VMount) {
        this.location = location;
    }

    getLocation(): VNode {
        return this.location?.getNode() || UI.mainNode;
    }
}

export default NodeLocator;