import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewContent extends UIComponent implements _UIComponent {
    constructor() {
        super();
        this.classname = "view-content";
    }
}
export default ViewContent;