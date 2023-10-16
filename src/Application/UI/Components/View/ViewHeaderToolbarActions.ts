/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import VNode from "../../Commons/VNode";
import ActionMenu from "../ActionMenu";

type _UIAction = {
    label?: string;
    icon?: string;
    command?: Function;
    severity?: string;
    rounded?: Boolean;
    asText?: Boolean;
};

class ViewHeaderToolbarActions extends VNode implements IVNode {
    #actionsMenu?: ActionMenu;

    constructor(props?: TProps) {
        super(props);

        this.#actionsMenu = new ActionMenu();
        if (this.#actionsMenu) {
            this.add(this.#actionsMenu);
        }
        this.classes.push("view-header-toolbar-actions");
    }

    addItems(items: _UIAction | _UIAction[]) {
        this.#actionsMenu?.addItems(items);
    }

    toHtml(): Element {
        return this.createElement();
    }
}

export default ViewHeaderToolbarActions;
