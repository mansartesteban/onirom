import { TComponentOptions, IUIComponent } from "@/index";

class UIComponent implements IUIComponent {

    classname: string = "ui-component";
    innerContent?: Element;
    dom: Element;
    parent?: Element;

    options: TComponentOptions;

    constructor(options?: TComponentOptions) {
        this.options = options || {};
        this.dom = document.createElement("div");
    }

    bindContent(element: Element) {
        this.innerContent = element;
        this.render();
    }

    makeHtml() {
        let element = document.createElement("div");
        element.classList.add(this.classname);
        if (this.innerContent) {
            element.appendChild(this.innerContent);
        }
        this.dom = element;
    }

    render(parent?: Element) {
        this.parent = parent || this.parent;
        if (this.parent) {
            if (this.dom) {
                if (this.dom.parentElement && this.dom.parentElement === this.parent) {
                    this.parent.removeChild(this.dom);
                }
                this.makeHtml();
                this.parent.appendChild(this.dom);
            }
        }
    }

}

export default UIComponent; 