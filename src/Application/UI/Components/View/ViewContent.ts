/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import VNode from "../../Commons/VNode";

class ViewContent extends VNode implements IVNode {
  toHtml(): Element {
    this.classes.push("view-content");
    return this.createElement();
  }
}
export default ViewContent;
