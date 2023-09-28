import { _EngineDatasTransport } from "../..";
import Component from "../Components";
import Entity from "../Entity";

class RenderComponent extends Component {

    update(entity: Entity, datas: _EngineDatasTransport) {
        this.render(entity, datas);
    }

    render(entity: Entity, datas: _EngineDatasTransport) {
        throw "Classes which extend RenderComponent must implement 'render' method";
    }
}

export default RenderComponent;