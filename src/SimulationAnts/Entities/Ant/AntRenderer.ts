import { _EngineDatasTransport } from "../../..";
import RenderComponent from "../../Components/RenderComponent";
import Entity from "../../Entity";

class AntRenderer extends RenderComponent {
  render(entity: Entity, datas: _EngineDatasTransport) {
    const ctx = datas.canvasContext;
    if (ctx) {
      let size = 10;

      ctx.fillStyle = "#ff0000";
      ctx.fillRect(
        entity.transform.position.x - size / 2,
        entity.transform.position.y - size / 2,
        size,
        size
      );
    }
  }
}

export default AntRenderer;
