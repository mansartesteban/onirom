import Entity from "./Entity";

class Component {

    options: { string?: any; } = {};

    constructor(options?: { string: any; }) {
        if (options) {
            this.options = options;
        }
    }

    updateComponent(entity: Entity) {
        this.update(entity);
    }

    update(entity: Entity) { }
}

export default Component;