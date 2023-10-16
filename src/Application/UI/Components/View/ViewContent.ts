/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import VNode from "../../Commons/VNode";

class ViewContent extends VNode implements IVNode {
  constructor(props: TProps) {
    super(props);
    this.classes.push("view-content");
  }
  toHtml(): Element {
    return this.createElement();
  }
}
export default ViewContent;
