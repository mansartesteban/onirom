import { TComponentOptions, IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import Text from "./Text";
import Icon from "./Icon";


class Button extends UIComponent implements IUIComponent {

    constructor(options: TComponentOptions = {}) {
        super(options);
        this.classname = "btn";
    };

    makeHtml(): void {
        super.makeHtml();
        this.options.props?.icon && new Icon(this.options.props.icon).render(this.dom);
        this.options.props?.label && new Text(this.options.props.label).render(this.dom);
        this.options.props?.severity && this.dom.classList.add(this.options.props.severity);
        this.options.props?.rounded && this.dom.classList.add("rounded");
        this.options.props?.asText && this.dom.classList.add("as-text");
        this.options.props?.command && this.dom.addEventListener("click", this.options.props?.command);
    }
}

export default Button;