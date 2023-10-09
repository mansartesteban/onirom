import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class ViewHeaderTabs extends UIComponent implements IUIComponent {
    constructor() {
        super();
        this.classname = "view-header-tabs";
    }
}

export default ViewHeaderTabs;