import ViewContainerLocation from "./ViewContainerLocation";
import ViewComponent from "@ui/Components/View/View";
import ViewDescriptor from "./ViewDescriptor";

class View {

    location?: ViewContainerLocation;
    descriptor: ViewDescriptor;
    component?: ViewComponent;

    constructor(location?: ViewContainerLocation, descriptor: ViewDescriptor = new ViewDescriptor) {
        this.location = location;
        this.descriptor = descriptor;
        this.createComponent();
        this.setup();
    }

    setup() { }

    hasComponent() {
        return !!this.component;
    }

    bindContent(element: Element) {
        if (this.hasComponent()) {
            (this.component as ViewComponent).slots.default?.bindContent(element);
        }
    }

    getContainer(): Element {
        if (!this.hasComponent()) {
            throw "No component found for the view " + this.descriptor.options.id;
        }
        return (this.component as ViewComponent).slots.content?.dom;
    }

    createComponent() {
        this.component = new ViewComponent(this.descriptor.options.id, this.descriptor?.options);
    }

    render() {
        if (this.hasComponent() && this.location) {
            (this.component as ViewComponent).render(this.location.getLocation());
        }
    }
}

export default View;