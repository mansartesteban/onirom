/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import ViewHeaderToolbarActions from "@ui/Components/View/ViewHeaderToolbarActions";
import Icon from "@ui/Components/Icon";
import Text from "@ui/Components/Text";
import VNode from "@ui/Core/Commons/VNode";

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

  create(): Element {
    return this.createElement();
  }
}

export default ViewHeaderToolbar;
