/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import ViewHeaderTabs from "./ViewHeaderTabs";
import ViewHeaderToolbar from "./ViewHeaderToolbar";
import VNode from "../../Commons/VNode";

class ViewHeader extends VNode implements IVNode {
  #tabs: ViewHeaderTabs;
  #toolbar: ViewHeaderToolbar;

  constructor(props?: TViewComponentProps) {
    super(props);

    this.#toolbar = new ViewHeaderToolbar(props);
    this.#tabs = new ViewHeaderTabs();

    this.defineSlot("toolbar", this.#toolbar);
    this.defineSlot("tabs", this.#tabs);
  }

  toHtml(): Element {
    this.classes.push("view-header");

    this.add(this.#toolbar);
    this.add(this.#tabs);
    return this.createElement();
  }
}

export default ViewHeader;
