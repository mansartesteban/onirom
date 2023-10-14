/// <reference path="../Commons/UI.d.ts" />

import VNode from "../Commons/VNode";

class Text extends VNode implements IVNode {
  text: string;

  constructor(text: string = "") {
    super();
    this.text = text;
  }

  toHtml(): Element {
    let dom = this.createElement();
    if (dom) {
      dom.innerHTML = this.text;
    }
    return dom;
  }
}

export default Text;
