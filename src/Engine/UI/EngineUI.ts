import View from "@core/UI/Layout/View";

import AppbarView from "./views/Appbar.view";
import ContextBarView from "./views/ContextBar.view";
import SceneView from "./views/Scene.view";
import BrowserView from "./views/Browser.view";
import { _UIComponent } from "@/index";


class EngineUI {

    static views: View[] = [];
    static mainView: View;
    static mountOn: Element;

    static setup() {
        EngineUI.#loadDefaultViews();
    }

    static mount(token: string) {
        let target = document.querySelector(token);

        if (target) {
            EngineUI.mountOn = target;
            EngineUI.render(target);
        }
    }

    static render(parent: Element) {
        EngineUI.mainView = new View();
        EngineUI.views.forEach((view: View) => {
            view.render(parent);
        });
        EngineUI.mainView.render(parent);
    }

    static #loadDefaultViews() {
        EngineUI.views.push(new AppbarView());
        EngineUI.views.push(new ContextBarView());
        EngineUI.views.push(new SceneView());
        EngineUI.views.push(new BrowserView());
    }

}

export default EngineUI;