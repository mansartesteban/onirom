import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewSplitter extends UIComponent implements _UIComponent {
    constructor() {
        super();
        this.classname = "view-splitter";
    }
}

export default ViewSplitter;