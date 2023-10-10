import ViewRegistry from "./View/ViewRegistry";
import ViewContainerLocation from "./View/ViewContainerLocation";
import Registry from "../Commons/Registry";
import View from "./View/View";

import AppbarView from "./DefaultViews/Appbar.view";
import ActivityBarView from "./DefaultViews/ActivityBar.view";
import ViewDescriptor from "./View/ViewDescriptor";


class UI {

    static mainView: View;
    static mountOn: Element;

    static setup() {

        let viewRegistry = new ViewRegistry("views");
        Registry.add(viewRegistry);

        UI.#loadDefaultLayout();
        UI.#loadDefaultViews();
    }

    static mount(token: string | Element) {
        let target = UI.findElement(token);

        UI.mountOn = target;
        UI.render();
    }

    static bind(viewIdentifier: string, element: Element) {
        let viewRegistry = Registry.get("views") as ViewRegistry;
        let foundView = viewRegistry.views.find((view: View) => view.descriptor.options.id === viewIdentifier);
        if (foundView) {
            foundView.bindContent(element);
        }
    }

    static findElement(token: string | Element): Element {
        if (typeof token === "string") {
            let found = document.querySelector(token);
            if (!found) {
                throw "Unable to mount UI on #app, element not found";
            }
            return found;
        }
        return token;
    }

    static render() {
        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.views.forEach((view: View) => view.render());
    }

    static #loadDefaultLayout() {
        UI.mainView = new View(new ViewContainerLocation("#app"), new ViewDescriptor({ id: "main", orientation: "horizontal" }));

        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.register(UI.mainView);

        // let menuBar = document.createElement("div");
        // menuBar.id = "menu-bar";
        // UI.mainView.bindContent(menuBar);
    }

    static #loadDefaultViews() {

        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.register(
            new AppbarView(
                new ViewContainerLocation(UI.mainView),
                new ViewDescriptor({ id: "appbar", hasHeader: true, title: "Barre d'application" })
            )
        );
        viewRegistry.register(
            new ActivityBarView(
                new ViewContainerLocation(UI.mainView),
                new ViewDescriptor({ id: "activity-bar", hasHeader: true, title: "Barre d'activité" })
            )
        );
        // viewRegistry.register(
        //     new SceneView(
        //         new ViewContainerLocation(viewRegistry.get("appbar")),
        //         new ViewDescriptor({ hasHeader: true })
        //     )
        // );
        // viewRegistry.register(
        //     new BrowserView(
        //         new ViewContainerLocation(viewRegistry.get("main")),
        //         new ViewDescriptor({ hasHeader: true })
        //     )
        // );

    }

}

export default UI;