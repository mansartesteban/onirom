/// <reference path="../Commons/UI.d.ts" />

import Icon from "./Icon";
import VNode from "../Commons/VNode";

class Button extends VNode implements IVNode {
    constructor(props?: TProps) {
        super(props);
    }

    setup() {
        const prps = this.defineProps({
            label: {
                type: String
            },
            icon: {
                type: String
            },
            severity: {
                type: String
            },
            rounded: {
                type: Boolean
            },
            asText: {
                type: Boolean
            },
            command: {
                type: Function
            }
        });

        prps.icon && this.add(new Icon(this.props.icon));
        prps.command && this.on("click", this.props?.command);

        prps.__observe("severity", () => {
            this.makeClasses();
        });
        // prps.__observe("attributes", () => {
        //     console.log("observed 'attributes'");
        //     this.makeAttributes();
        // });
        prps.__observe("label", () => {
            this.makeContent();
        });
    }

    makeContent() {
        this.content = this.props.label;
    }

    makeClasses() {
        this.classes = [
            "btn",
            this.props.rounded && "rounded",
            this.props.asText && "as-text",
            this.props.severity
        ];
    }

    makeAttributes() {
        this.attributes = {
            style: "border: 10px solid blue"
        };
    }

    create(): Element {
        let dom = this.createElement();
        this.makeClasses();
        this.makeAttributes();
        this.makeContent();
        return dom;
    }
}

export default Button;
