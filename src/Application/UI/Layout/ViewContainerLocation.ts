import UI from "@ui/main";

class ViewContainerLocation {

    location: string;

    constructor(location: string) {
        this.location = location;
    }

    getLocation(): Element {
        let location = UI.mountOn;
        if (this.location) {
            location = document.querySelector(this.location) || UI.mountOn;
        }

        return location;
    }

}

export default ViewContainerLocation;