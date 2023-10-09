import ViewContainerLocation from "./ViewContainerLocation";
import ViewComponent from "@ui/Components/View/View";

class View {

    identifier: string;
    location?: ViewContainerLocation;
    component?: ViewComponent;

    constructor(identifier: string = "") {
        this.identifier = identifier;
        this.createComponent();
    }

    hasComponent() {
        return !!this.component;
    }

    bindContent(element: Element) {
        if (this.hasComponent()) {
            (this.component as ViewComponent).content.bindContent(element);
        }
    }

    createComponent() {
        this.component = new ViewComponent(this.identifier);
    }

    render() {
        if (this.hasComponent() && this.location) {
            (this.component as ViewComponent).render(this.location.getLocation());
        }
    }
}

export default View;