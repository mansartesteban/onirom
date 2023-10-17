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
import Button from "./Components/Button";

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

        let btn = new Button({ label: "Counter : 0", severity: "error", rounded: true, command });
        UI.mainNode.add(btn);
        btn.render(UI.mainNode);

        let c = 0;
        function command() {
            c++;
            btn.props.label = "Counter : " + c;
            btn.props.severity = c % 2 ? "error" : c % 5 ? "success" : "info";
        }
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

    }
}

export default UI;
