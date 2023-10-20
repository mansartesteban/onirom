/// <reference path="View.d.ts" />
/// <reference path="../../Commons/UI.d.ts" />

import ViewHeader from "./ViewHeader";
import ViewContent from "./ViewContent";
import VNode from "../../Commons/VNode";

class View extends VNode implements IVNode {
  #header?: ViewHeader;
  #content: ViewContent;

  constructor(props?: TProps) {
    super(props);

    if (props?.hasHeader) {
      this.#header = new ViewHeader(this.props);
      this.defineSlot("header", this.#header);
      this.add(this.#header);
    }
    this.#content = new ViewContent({ orientation: this.props.orientation });

    this.classes.push("view", this.props.orientation || "vertical");

    this.defineSlot("content", this.#content);

    this.add(this.#content);

  }

  create(): Element {
    return this.createElement();
  }
}

export default View;
