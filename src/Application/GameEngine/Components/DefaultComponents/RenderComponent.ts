import Entity from "@gameengine/Core/Entity";
import Component from "@gameengine/Core/Component";

class RenderComponent extends Component {

    update(entity: Entity) {
        this.render(entity);
    }

    render(_: Entity) {
        throw "Classes that extend RenderComponent must implement 'render' method";
    }
}

export default RenderComponent;