import { TComponentOptions, IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import Text from "./Text";
import Icon from "./Icon";


class Button extends UIComponent implements IUIComponent {

    constructor(options: TComponentOptions = {}) {
        super(options.props);
        this.classname = "btn";
    };

    makeHtml(): void {
        super.makeHtml();
        this.props?.icon && new Icon(this.props.icon).render(this.dom);
        this.props?.label && new Text(this.props.label).render(this.dom);
        this.props?.severity && this.dom.classList.add(this.props.severity);
        this.props?.rounded && this.dom.classList.add("rounded");
        this.props?.asText && this.dom.classList.add("as-text");
        this.props?.command && this.dom.addEventListener("click", this.props?.command);
    }
}

export default Button;