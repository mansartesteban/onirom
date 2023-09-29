import { _EngineDatasTransport } from "../../..";
import RenderComponent from "../../Components/RenderComponent";
import Entity from "../../Entity";
import Food from "./Food";

class FoodRenderer extends RenderComponent {
  render(entity: Entity, datas: _EngineDatasTransport) {
    if (datas.canvas && datas.canvasContext) {
      let food = (entity as Food).food;
      datas.canvasContext.beginPath();
      datas.canvasContext.arc(
        entity.transform.position.x,
        entity.transform.position.y,
        food < 0 ? 0 : food,
        0,
        Math.PI * 2,
        true
      );
      datas.canvasContext.fillStyle = "#FF00FF44";
      datas.canvasContext.fill();
      datas.canvasContext.closePath();
    }
  }
}

export default FoodRenderer;
