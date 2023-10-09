import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeaderTabs from "./ViewHeaderTabs";
import ViewHeaderToolbar from "./ViewHeaderToolbar";

class ViewHeader extends UIComponent implements IUIComponent {

    tabs: ViewHeaderTabs;
    toolbar: ViewHeaderToolbar;

    constructor() {
        super();
        this.classname = "view-header";
        this.tabs = new ViewHeaderTabs();
        this.toolbar = new ViewHeaderToolbar();
    }

    makeHtml(): void {
        super.makeHtml();
        this.toolbar.render(this.dom);
        this.tabs.render(this.dom);
    }
}

export default ViewHeader;