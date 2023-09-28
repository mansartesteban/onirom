import { _EngineDatasTransport } from "../../..";
import RenderComponent from "../../Components/RenderComponent";
import Entity from "../../Entity";

class AntRenderer extends RenderComponent {
    render(entity: Entity, datas: _EngineDatasTransport) {
        const ctx = datas.canvasContext;
        if (ctx) {
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(entity.transform.position.x, entity.transform.position.y, 10, 10)
        }
    }
}

export default AntRenderer;