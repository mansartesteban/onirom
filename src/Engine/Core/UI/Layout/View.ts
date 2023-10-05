import { _UIComponent } from "@/index";
import ViewContainer from "./ViewContainer";
import ViewHeaderTabs from "./ViewHeaderTabs";
import ViewHeaderToolbar from "./ViewHeaderToolbar";
import UIComponent from "../UIComponent";

class View extends UIComponent implements _UIComponent {

    toolbar: ViewHeaderToolbar;
    tabs: ViewHeaderTabs;
    childrenViewContainer: ViewContainer[];

    constructor() {
        super();
        this.toolbar = new ViewHeaderToolbar();
        this.tabs = new ViewHeaderTabs();
        this.childrenViewContainer = [];

        this.classname = "view";
    }

    makeHtml() {
        let element = document.createElement("div");
        element.classList.add(this.classname);
        this.tabs.render(element);
        this.toolbar.render(element);
        this.dom = element;
    }

}

export default View;
