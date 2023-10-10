import UIComponent from "./UIComponent";

class Slot {
    name: string;
    element: UIComponent;

    constructor(name: string = "", element: UIComponent) {
        this.name = name;
        this.element = element;
    }


}

export default Slot;