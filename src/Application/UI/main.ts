import AppbarView from "./views/Appbar.view";
import ContextBarView from "./views/ContextBar.view";
import SceneView from "./views/Scene.view";
import BrowserView from "./views/Browser.view";
import ViewRegistry from "./Layout/ViewRegistry";
import ViewContainerLocation from "./Layout/ViewContainerLocation";
import Registry from "../Commons/Registry";
import View from "./Layout/View";


class UI {

    static mainView: View;
    static mountOn: Element;

    static setup() {
        UI.#loadDefaultViews();
    }

    static mount(token: string | Element) {
        let target = UI.findElement(token);

        UI.mountOn = target;
        UI.render();
    }

    static bind(viewIdentifier: string, element: Element) {
        let viewRegistry = Registry.get("views") as ViewRegistry;
        let foundView = viewRegistry.views.find((view: View) => view.identifier === viewIdentifier);
        console.log("found?", foundView);
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

        UI.mainView = new View("main");
        UI.mainView.render();
        viewRegistry.register(UI.mainView, new ViewContainerLocation("#app"));
    }

    static #loadDefaultViews() {
        let viewRegistry = new ViewRegistry("views");

        viewRegistry.register(new AppbarView(), new ViewContainerLocation(""));
        viewRegistry.register(new ContextBarView(), new ViewContainerLocation(""));
        viewRegistry.register(new SceneView(), new ViewContainerLocation(""));
        viewRegistry.register(new BrowserView(), new ViewContainerLocation(""));

        Registry.add(viewRegistry);
    }

}

export default UI;