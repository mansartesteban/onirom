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
  #actionsMenu?: VNode;

  constructor(props?: TProps) {
    super(props);

    this.#actionsMenu = new ActionMenu();
  }

  addActions(actions: _UIAction | _UIAction[]) {
    if (!Array.isArray(actions)) {
      actions = [actions];
    }

    if (this.#actionsMenu) {
      this.#actionsMenu.props.items =
        this.#actionsMenu.props.items.concat(actions);
    }

    this.render(null, true);
  }

  toHtml(): Element {
    if (this.#actionsMenu) {
      this.add(this.#actionsMenu);
    }

    this.classes.push("view-header-toolbar-actions");
    return this.createElement();
  }
}

export default ViewHeaderToolbarActions;
