import { IRegistry } from "@/index";
import ViewContainerLocation from "./ViewContainerLocation";
import View from "@ui/Layout/View";

class ViewRegistry implements IRegistry {

    views: View[];
    id: string;

    constructor(id: string = "views") {
        this.id = id;
        this.views = [];
    }

    register(views: View | View[], viewLocation: ViewContainerLocation): void {
        if (!Array.isArray(views)) {
            views = [views];
        }
        views.forEach(view => {
            view.location = viewLocation;
            this.views.push(view);
        });
    }
}

export default ViewRegistry;