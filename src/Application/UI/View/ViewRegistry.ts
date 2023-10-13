import { IRegistry } from "@/index";
import View from "@/Application/UI/View/View";

class ViewRegistry implements IRegistry {

    views: View[];
    id: string;

    constructor(id: string = "views") {
        this.id = id;
        this.views = [];
    }

    get(viewName: string) {
        return this.views.find((view: View) => view.name === viewName);
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