import VNode from "@ui/Core/Commons/VNode";
import { ILocalizable } from "@/index";
import Registry from "@/Application/Commons/Registry";
import ViewRegistry from "@ui/Core/View/ViewRegistry";
import NodeLocator from "@ui/Core/Commons/NodeLocator";

class ViewLocator extends NodeLocator implements ILocalizable {
  viewName: string;

  constructor(viewName: string) {
    super();
    this.viewName = viewName;
  }

  getLocation(): VNode {
    let viewRegistry = Registry.get("views") as ViewRegistry;
    let foundView = viewRegistry.get(this.viewName);
    return (foundView?.component as VNode).slots.content;
  }
}

export default ViewLocator;

/*
 TODO
 La location doit être un ViewContainer
 La location doit connaître la position dans le ViewContainer (si plusieurs enfants)
 */
