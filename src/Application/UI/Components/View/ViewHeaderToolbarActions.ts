import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import Button from "../Button";

type _UIAction = {
    label?: string;
    icon?: string;
    command?: Function;
    severity?: string;
    rounded?: Boolean;
    asText?: Boolean;
};

class ViewHeaderToolbarActions extends UIComponent implements IUIComponent {

    #actions: _UIAction[] = [];

    constructor() {
        super();
        this.classname = "view-header-toolbar-actions";
    }

    addActions(action: _UIAction | _UIAction[]) {
        if (!Array.isArray(action)) {
            action = [action];
        }
        action.forEach(action => this.#actions.push(action));
        this.render();
    }

    makeHtml(): void {
        super.makeHtml();
        this.#actions.forEach((action: _UIAction) => {
            new Button({ props: action }).render(this.dom);
        });
    }
}

export default ViewHeaderToolbarActions;