import { _UIComponent } from "@/index";

class UIComponent implements _UIComponent {

    classname: string = "ui-component";
    dom?: Element;

    makeHtml() {
        let element = document.createElement("div");
        element.classList.add(this.classname);
        this.dom = element;
    }

    render(parent: Element) {
        this.makeHtml();
        if (this.dom) {
            parent.appendChild(this.dom);
        }
    }

}

export default UIComponent; 