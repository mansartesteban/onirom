import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class ViewContainer extends UIComponent implements IUIComponent {

    constructor() {
        super();
        this.classname = "view-container";
    }
}

export default ViewContainer;