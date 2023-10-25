import UI from "@ui/main";
import VMount from "@ui/Core/Commons/VMount";
import VNode from "@ui/Core/Commons/VNode";

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
