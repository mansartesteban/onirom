/// <reference path="../Commons/UI.d.ts" />

import VNode from "../Commons/VNode";

class Text extends VNode implements IVNode {

    text: string;

    constructor(text: string = "") {
        super();
        this.text = text;
    }

    toHtml(): void {
        super.toHtml();
        if (this.dom) {
            this.dom.innerHTML = this.text;
        }
    }
}

export default Text;