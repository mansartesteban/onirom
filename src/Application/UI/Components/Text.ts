import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class Text extends UIComponent implements IUIComponent {

    text: string;

    constructor(text: string = "") {
        super();
        this.text = text;
    }

    makeHtml(): void {
        super.makeHtml();
        this.dom.innerHTML = this.text;
    }
}

export default Text;