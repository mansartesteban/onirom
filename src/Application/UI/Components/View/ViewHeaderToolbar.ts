import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeaderToolbarActions from "./ViewHeaderToolbarActions";
import Icon from "../Icon";
import Text from "../Text";

class ViewHeaderToolbar extends UIComponent implements IUIComponent {

    actions: ViewHeaderToolbarActions;

    constructor() {
        super();
        this.classname = "view-header-toolbar";

        this.actions = new ViewHeaderToolbarActions();
    }

    makeHtml(): void {
        super.makeHtml();
        new Icon("chevron-down").render(this.dom);
        new Text("Toolbar title here").render(this.dom);
        this.actions.render(this.dom);
    }

}

export default ViewHeaderToolbar;