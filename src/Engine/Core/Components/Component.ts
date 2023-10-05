import Entity from "@core/Entity";

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

    update(_: Entity) { }
}

export default Component;