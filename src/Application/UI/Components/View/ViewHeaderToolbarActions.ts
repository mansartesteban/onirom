/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import Button from "../Button";
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

    #actionsMenu?: VNode;

    constructor(props: TProps) {
        super(props);

        this.#actionsMenu = new ActionMenu();
    }

    addActions(actions: _UIAction | _UIAction[]) {
        if (!Array.isArray(actions)) {
            actions = [actions];
        }

        if (this.#actionsMenu) {
            this.#actionsMenu.props.items = this.#actionsMenu.props.items.concat(actions);
        }

        this.render();
    }

    toHtml(): void {
        super.toHtml();

        if (this.#actionsMenu) {
            this.add(this.#actionsMenu);
        }

        this.classes.push("view-header-toolbar-actions");
    }
}

export default ViewHeaderToolbarActions;