import ViewComponent from "@/Application/UI/Components/View/View";
import ViewDescriptor from "./ViewDescriptor";
import NodeLocator from "../Commons/NodeLocator";

class View {
  location?: NodeLocator;
  descriptor: ViewDescriptor;
  component: ViewComponent;

  name: string;

  constructor(
    location?: NodeLocator,
    descriptor: ViewDescriptor = new ViewDescriptor()
  ) {
    this.name = descriptor.options.name ?? "default-view";
    this.location = location;
    this.descriptor = descriptor;
    this.component = new ViewComponent(this.descriptor?.options);
    this.setup();
  }

  setup() { }

  hasComponent() {
    return !!this.component;
  }

  render() {
    if (this.hasComponent() && this.location) {
      (this.component as ViewComponent).render(this.location.getLocation());
    }
  }
}

export default View;
