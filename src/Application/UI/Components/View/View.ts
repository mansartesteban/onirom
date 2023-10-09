import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeader from "./ViewHeader";
import ViewContent from "./ViewContent";

class View extends UIComponent implements IUIComponent {

    header: ViewHeader;
    content: ViewContent;
    identifier: string;

    constructor(identifier: string = "default-view") {
        super();
        this.header = new ViewHeader();
        this.content = new ViewContent();

        this.classname = "view";
        this.identifier = identifier;
    }

    makeHtml() {
        super.makeHtml();
        this.dom.id = this.identifier;
        this.header.render(this.dom);
        this.content.render(this.dom);
    }

}

export default View;
