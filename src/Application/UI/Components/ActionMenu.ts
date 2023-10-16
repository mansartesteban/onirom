import VNode from "../Commons/VNode";
import Button from "./Button";

class ActionMenu extends VNode {
    constructor(props?: TProps) {
        super(props);

        this.defineProps({
            items: {
                type: Array,
                default: () => [],
            },
            maxActions: {
                type: Number,
                default: 3,
            },
        });
        this.classes.push("action-menu");

        if (this.props.maxActions) {
            console.log("max action", this.props.items, this.props.maxActions);
            this.props.items
                .slice(0, this.props.maxActions)
                .forEach((item: TProps) => {
                    console.log("adding btn", item);
                    this.add(new Button(item));
                });
        }
    }

    addItems(items: any) {
        if (!Array.isArray(items)) {
            items = [items];
        }

        this.props.items = this.props.items.concat(items);
        this.props.items
            .slice(0, this.props.maxActions)
            .forEach((item: TProps) => {
                console.log("adding btn", item);
                this.add(new Button(item));
            });
    }

    toHtml(): Element {
        console.log("this.items", this.props.items, this.children);
        return this.createElement();
    }
}

export default ActionMenu;
