import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";

class Icon extends UIComponent implements IUIComponent {

    iconName: string;

    constructor(iconName: string = "close-r") {
        super();
        this.iconName = iconName.startsWith("gg-") ? iconName : "gg-" + iconName;
    }

    makeHtml(): void {
        this.dom = document.createElement("i");
        this.dom.classList.add(this.iconName);
    }
}

export default Icon;