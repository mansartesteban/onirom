import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewHeader extends UIComponent implements _UIComponent {
    constructor() {
        super();
        this.classname = "view-header";
    }
}

export default ViewHeader;