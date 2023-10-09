import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class ViewSplitter extends UIComponent implements IUIComponent {
    constructor() {
        super();
        this.classname = "view-splitter";
    }
}

export default ViewSplitter;