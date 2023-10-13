/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import Button from "../Button";
import VNode from "../../Commons/VNode";

type _UIAction = {
    label?: string;
    icon?: string;
    command?: Function;
    severity?: string;
    rounded?: Boolean;
    asText?: Boolean;
};

class ViewHeaderToolbarActions extends VNode implements IVNode {

    #actions: _UIAction[] = [];

    addActions(action: _UIAction | _UIAction[]) {
        if (!Array.isArray(action)) {
            action = [action];
        }
        action.forEach(action => this.#actions.push(action));
    }

    toHtml(): void {
        super.toHtml();
        this.#actions.forEach((action: _UIAction) => {
            this.add(new Button(action));
        });

        this.classes.push("view-header-toolbar-actions");
    }
}

export default ViewHeaderToolbarActions;