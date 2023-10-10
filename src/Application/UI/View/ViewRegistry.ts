import { IRegistry } from "@/index";
import View from "@/Application/UI/View/View";

class ViewRegistry implements IRegistry {

    views: View[];
    id: string;

    constructor(id: string = "views") {
        this.id = id;
        this.views = [];
    }

    get(viewIdentifier: string) {
        return this.views.find((view: View) => view.identifier === viewIdentifier);
    }

    register(views: View | View[]): void {
        if (!Array.isArray(views)) {
            views = [views];
        }
        views.forEach(view => {
            this.views.push(view);
        });
    }
}

export default ViewRegistry;