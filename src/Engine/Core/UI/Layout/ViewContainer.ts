import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewContainer extends UIComponent implements _UIComponent {

    constructor() {
        super();
        this.classname = "view-container";
    }
}

export default ViewContainer;