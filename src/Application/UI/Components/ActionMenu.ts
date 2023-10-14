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
  }

  toHtml(): Element {
    if (this.props.maxActions) {
      this.props.items
        .slice(0, this.props.maxActions)
        .forEach((item: TProps) => {
          this.add(new Button(item));
        });
    }
    return this.createElement();
  }
}

export default ActionMenu;
