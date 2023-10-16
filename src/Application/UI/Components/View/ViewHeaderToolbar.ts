/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import ViewHeaderToolbarActions from "./ViewHeaderToolbarActions";
import Icon from "../Icon";
import Text from "../Text";
import VNode from "../../Commons/VNode";

class ViewHeaderToolbar extends VNode implements IVNode {
  #actions: ViewHeaderToolbarActions;

  constructor(props?: TViewComponentProps) {
    super(props);

    this.#actions = new ViewHeaderToolbarActions();

    this.defineSlot("actions", this.#actions);
    this.classes.push("view-header-toolbar");

    this.add(new Icon("chevron-down"));
    this.add(new Text(this.props.title));
    this.add(this.#actions);
  }

  toHtml(): Element {
    return this.createElement();
  }
}

export default ViewHeaderToolbar;
