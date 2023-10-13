/// <reference path="../Commons/UI.d.ts" />

import VNode from "../Commons/VNode";

class Icon extends VNode implements IVNode {

    iconName: string;

    constructor(iconName: string = "close-r") {
        super();
        this.iconName = iconName.startsWith("gg-") ? iconName : "gg-" + iconName;
    }

    toHtml(): void {
        this.dom = document.createElement("i");
        this.dom.classList.add(this.iconName);
    }
}

export default Icon;