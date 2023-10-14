/// <reference path="../Commons/UI.d.ts" />

import Text from "./Text";
import Icon from "./Icon";
import VNode from "../Commons/VNode";


class Button extends VNode implements IVNode {

    toHtml(): void {
        super.toHtml();
        this.classes.push("btn");

        this.props?.icon && this.add(new Icon(this.props.icon));
        this.props?.label && this.add(new Text(this.props.label));

        this.props?.severity && this.classes.push(this.props.severity);
        this.props?.rounded && this.classes.push("rounded");
        this.props?.asText && this.classes.push("as-text");

        this.props?.command && this.on("click", this.props?.command);
    }
}

export default Button;