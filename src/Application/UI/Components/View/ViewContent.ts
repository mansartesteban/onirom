/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import VNode from "../../Commons/VNode";

class ViewContent extends VNode implements IVNode {
    toHtml(): void {
        super.toHtml();
        this.classes.push("view-content");
    }
}
export default ViewContent;