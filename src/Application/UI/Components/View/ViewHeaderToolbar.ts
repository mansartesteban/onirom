import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeaderToolbarActions from "./ViewHeaderToolbarActions";
import Icon from "../Icon";
import Text from "../Text";
type TViewComponentProps = {
    hasHeader?: Boolean;
    hasToolbar?: Boolean;
    hasTabs?: Boolean;
};
class ViewHeaderToolbar extends UIComponent implements IUIComponent {

    #actions: ViewHeaderToolbarActions;

    identifier: string;

    constructor(identifier: string = "default-view", props?: TViewComponentProps) {
        super();

        this.props = { ...this.props, ...props };
        this.classname = "view-header-toolbar";
        this.identifier = identifier;

        this.#actions = new ViewHeaderToolbarActions();

        this.defineSlot("actions", this.#actions);
    }

    makeHtml(): void {
        super.makeHtml();
        this.append(new Icon("chevron-down"));
        this.append(new Text(this.props.title));
        this.append(this.#actions);
    }

}

export default ViewHeaderToolbar;