/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import ViewHeader from "./ViewHeader";
import ViewContent from "./ViewContent";
import VNode from "../../Commons/VNode";

class View extends VNode implements IVNode {

    #header: ViewHeader;
    #content: ViewContent;

    constructor(props?: TProps) {
        super(props);

        this.#header = new ViewHeader(this.props);
        this.#content = new ViewContent({ orientation: this.props.orientation });

        this.defineSlot("header", this.#header);
        this.defineSlot("content", this.#content);

    }

    toHtml() {
        super.toHtml();

        this.classes.push("view", this.props.orientation || "vertical");

        if (this.props.hasHeader) {
            this.add(this.#header);
        }


        this.add(this.#content);
    }

}

export default View;
