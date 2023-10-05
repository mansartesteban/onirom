import Entity from "@core/Entity";
import Component from "@core/Components/Component";

class RenderComponent extends Component {

    update(entity: Entity) {
        this.render(entity);
    }

    render(_: Entity) {
        throw "Classes that extend RenderComponent must implement 'render' method";
    }
}

export default RenderComponent;