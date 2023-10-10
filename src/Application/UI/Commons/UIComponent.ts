import { IUIComponent } from "@/index";

class UIComponent implements IUIComponent {

    classname: string = "ui-component";
    innerContent?: Element;
    dom: Element;
    parent?: Element;

    props: { [name: string]: any; } = {};
    slots: { [name: string]: any; } = {};
    children: UIComponent[] = [];

    identifier: string = "";

    constructor(props: { [name: string]: any; } = {}) {
        this.props = props || {};
        this.dom = document.createElement("div");
        this.defineSlot("default", this);
    }

    defineSlot(name: string, element: UIComponent) {
        this.slots[name] = element;
    }

    bindContent(element: Element) {
        this.innerContent = element;
        this.render();
    }

    makeHtml() {
        let element = document.createElement("div");
        element.classList.add(this.classname);
        this.dom = element;
        this.dom.id = this.identifier;
    }

    append(element: UIComponent) {
        this.children.push(element);
    }

    render(parent?: Element) {
        this.parent = parent || this.parent;
        if (this.parent) {
            if (this.dom) {

                // If shadow dom node already exists, refresh it
                if (this.dom.parentElement && this.dom.parentElement === this.parent) {
                    this.parent.removeChild(this.dom);
                }
                this.makeHtml();
                this.children.forEach((child: UIComponent) => {
                    child.render(this.dom);
                    this.dom.appendChild(child.dom);
                });
                this.parent.appendChild(this.dom);
            }
        }
    }

}

export default UIComponent; 