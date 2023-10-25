/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import VNode from "@ui/Core/Commons/VNode";

class ViewContent extends VNode implements IVNode {
  constructor(props: TProps) {
    super(props);
    this.classes.push("view-content");
  }
  create(): Element {
    return this.createElement();
  }
}
export default ViewContent;
