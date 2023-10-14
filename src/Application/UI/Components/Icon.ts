/// <reference path="../Commons/UI.d.ts" />

import VNode from "../Commons/VNode";

class Icon extends VNode implements IVNode {
  iconName: string;

  constructor(iconName: string = "close-r") {
    super();
    this.iconName = iconName.startsWith("gg-") ? iconName : "gg-" + iconName;
  }

  toHtml(): Element {
    let dom = this.createElement("i");
    dom.classList.add(this.iconName);
    return dom;
  }
}

export default Icon;
