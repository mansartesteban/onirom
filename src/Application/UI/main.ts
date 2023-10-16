/// <reference path="./Commons/UI.d.ts" />

import ViewRegistry from "./View/ViewRegistry";
import Registry from "../Commons/Registry";
import View from "./View/View";

import AppbarView from "./DefaultViews/Appbar.view";
import ActivityBarView from "./DefaultViews/ActivityBar.view";
import ViewDescriptor from "./View/ViewDescriptor";
import VNode from "./Commons/VNode";
import NodeLocator from "./Commons/NodeLocator";
import VNodeRegistry from "./Commons/VNodeRegistry";
import VMount from "./Commons/VMount";
import ViewLocator from "./View/ViewLocator";
import SceneView from "./DefaultViews/Scene.view";

class UI {
    static mainView: View;
    static mainNode: VNode;
    static mountOn: VMount;

    static setup() {
        let viewRegistry = new ViewRegistry("views");
        Registry.add(viewRegistry);
        let nodeRegistry = new VNodeRegistry("vnode");
        Registry.add(nodeRegistry);

        UI.#loadDefaultLayout();
        UI.#loadDefaultViews();
    }

    static mount(token: string | Element) {
        UI.mountOn = new VMount(token);
        UI.render();
    }

    static render() {
        UI.mainNode = new VNode();
        UI.mainNode.dom = UI.mountOn.getElement();

        UI.mainNode.dom?.appendChild(document.createElement("div"));
        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.views.forEach((view: View) => view.render());

    }

    static #loadDefaultLayout() {

        UI.mainView = new View(
            new NodeLocator(new VMount("#app")),
            new ViewDescriptor({ name: "main", orientation: "horizontal" })
        );

        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.register(UI.mainView);
    }

    static #loadDefaultViews() {
        let viewRegistry = Registry.get("views") as ViewRegistry;
        viewRegistry.register(
            new AppbarView(
                new ViewLocator("main"),
                new ViewDescriptor({
                    name: "appbar",
                    hasHeader: true,
                    title: "Barre d'application",
                    //   maxActions: 2, //TODO:
                })
            )
        );
        viewRegistry.register(
            new ActivityBarView(
                new ViewLocator("main"),
                new ViewDescriptor({
                    name: "activity-bar",
                    hasHeader: true,
                    title: "Barre d'activité",
                })
            )
        );
        viewRegistry.register(
            new SceneView(
                new ViewLocator("activity-bar"),
                new ViewDescriptor({
                    name: "scene",
                    title: "♫ La scène, la scèène, la scèèène !",
                    hasHeader: true,
                })
            )
        );

        // for (let i = 0;i < 5;i++) {
        //     viewRegistry.register(
        //         new BrowserView(
        //             new ViewLocator("activity-bar"),
        //             new ViewDescriptor({ name: "browser", hasHeader: false })
        //         )
        //     );
        // }
    }
}

export default UI;

/*

TODO:
- Changer le nom de la class XXXLocation en XXXLocator
- Créer un locator générique pour trouver un VNODE
- Créer un locator spécifique aux Views qui renverrons leur VNode
- Appliquer un nom sur une View ("views.appbar")
- Chercher via ce nom pour le ViewLocator
*/
