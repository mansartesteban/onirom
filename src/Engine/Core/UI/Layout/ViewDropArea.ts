import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewDropArea extends UIComponent implements _UIComponent {
    constructor() {
        super();
        this.classname = "view-drop-area";
    }
}

export default ViewDropArea;