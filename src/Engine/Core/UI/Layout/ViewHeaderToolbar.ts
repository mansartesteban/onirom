import { _UIComponent } from "@/index";
import UIComponent from "../UIComponent";

class ViewHeaderToolbar extends UIComponent implements _UIComponent {

    actions: string[];

    constructor() {
        super();
        this.classname = "view-header-toolbar";

        this.actions = [];
    }

    makeHtml(): void {
        console.log("make html de header toolbar?");
        this.dom = document.createElement("div");
        this.dom.innerHTML = this.actions.join(" - ");
    }
}

export default ViewHeaderToolbar;