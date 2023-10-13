import VNode from "../Commons/VNode";
import { ILocalizable } from "@/index";
import Registry from "@/Application/Commons/Registry";
import ViewRegistry from "./ViewRegistry";
import NodeLocator from "../Commons/NodeLocator";

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
 TODO:
 La location doit être un ViewContainer
 La location doit connaître la position dans le ViewContainer (si plusieurs enfants)
 */