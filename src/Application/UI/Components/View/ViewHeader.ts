import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeaderTabs from "./ViewHeaderTabs";
import ViewHeaderToolbar from "./ViewHeaderToolbar";
type TViewComponentProps = {
    hasHeader?: Boolean;
    hasToolbar?: Boolean;
    hasTabs?: Boolean;
};
class ViewHeader extends UIComponent implements IUIComponent {

    #tabs: ViewHeaderTabs;
    #toolbar: ViewHeaderToolbar;

    identifier: string;

    constructor(identifier: string = "view-header", props?: TViewComponentProps) {
        super();

        this.props = { ...this.props, ...props };
        this.classname = "view-header";
        this.identifier = identifier;

        this.#toolbar = new ViewHeaderToolbar("", this.props);
        this.#tabs = new ViewHeaderTabs();

        this.defineSlot("toolbar", this.#toolbar);
        this.defineSlot("tabs", this.#tabs);

    }

    makeHtml(): void {
        super.makeHtml();

        this.append(this.#toolbar);
        this.append(this.#tabs);
    }
}

export default ViewHeader;