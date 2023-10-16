/// <reference path="../Commons/UI.d.ts" />

import VNode from "../Commons/VNode";

class Icon extends VNode implements IVNode {
  iconName: string;

  constructor(iconName: string = "close-r") {
    super();
    this.iconName = iconName.startsWith("gg-") ? iconName : "gg-" + iconName;
    this.classes.push(this.iconName);
  }

  toHtml(): Element {
    return this.createElement("i");
  }
}

export default Icon;
