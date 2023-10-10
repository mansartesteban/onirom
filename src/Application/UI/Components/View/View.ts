import { IUIComponent } from "@/index";
import UIComponent from "@ui/Commons/UIComponent";
import ViewHeader from "./ViewHeader";
import ViewContent from "./ViewContent";
type TViewComponentProps = {
    hasHeader?: Boolean;
    hasToolbar?: Boolean;
    hasTabs?: Boolean;
    title?: string;
};
class View extends UIComponent implements IUIComponent {

    #header: ViewHeader;
    #content: ViewContent;

    identifier: string;

    constructor(identifier: string = "default-view", props?: TViewComponentProps) {
        super();

        this.props = { ...this.props, ...props };
        this.classname = "view";
        this.identifier = identifier;

        this.#header = new ViewHeader("", this.props);
        this.#content = new ViewContent();

        this.defineSlot("header", this.#header);
        this.defineSlot("content", this.#content);

    }

    makeHtml() {
        super.makeHtml();

        if (this.props.hasHeader) {
            this.append(this.#header);
        }

        this.append(this.#content);
    }

}

export default View;
