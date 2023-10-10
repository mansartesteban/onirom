import UI from "@ui/main";
import View from "./View";

class ViewContainerLocation {

    targetElement: View | Element;

    constructor(location?: View | string) {
        if (location === undefined) {
            location = "#main";
        }
        if (typeof location === "string") {
            this.targetElement = this.querySelector(location);
        } else {
            this.targetElement = location;
        }
    }

    querySelector(token: string): Element {
        let element = document.querySelector(token);
        if (!element) {
            throw `Unable to find the targeted element "${token}"`;
        }
        return element;
    }

    getLocation(): Element {
        let location = this.targetElement || UI.mainView;
        return location instanceof Element ? location : location.getContainer();
    }


}

export default ViewContainerLocation;

/*
 TODO:
 La location doit être un ViewContainer
 La location doit connaître la position dans le ViewContainer (si plusieurs enfants)
 */