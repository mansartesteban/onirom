import Component from "../Components";
import Entity from "../Entity";

class RenderComponent extends Component {

    update(entity: Entity) {
        this.render(entity);
    }

    render(entity: Entity) {
        throw "Classes which extend RenderComponent must implement 'render' method";
    }
}

export default RenderComponent;