import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class ViewDropArea extends UIComponent implements IUIComponent {
    constructor() {
        super();
        this.classname = "view-drop-area";
    }
}

export default ViewDropArea;