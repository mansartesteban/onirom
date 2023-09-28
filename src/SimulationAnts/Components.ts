import { _EngineDatasTransport } from "..";
import Entity from "./Entity";

class Component {

    options: { string?: any } = {};

    constructor(options?: { string: any }) {
        if (options) {
            this.options = options;
        }
    }

    updateComponent(entity: Entity, datas: _EngineDatasTransport) {
        this.update(entity, datas);
    }

    update(entity: Entity, datas: _EngineDatasTransport) { }
}

export default Component;