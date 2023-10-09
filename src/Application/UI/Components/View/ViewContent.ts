import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class ViewContent extends UIComponent implements IUIComponent {
    constructor() {
        super();
        this.classname = "view-content";
    }
}
export default ViewContent;