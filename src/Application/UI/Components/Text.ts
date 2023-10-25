/// <reference path="../Commons/UI.d.ts" />

import VNode from "@ui/Core/Commons/VNode";

class Text extends VNode implements IVNode {
  text: string;

  constructor(text: string = "") {
    super();
    this.text = text;
  }

  create(): Element {
    let dom = this.createElement();
    dom.innerHTML = this.text;
    return dom;
  }
}

export default Text;
