import { _EngineDatasTransport } from "../../..";
import RenderComponent from "../../Components/RenderComponent";
import Home from "./Home";

class HomeRenderer extends RenderComponent {
  render(entity: Home, datas: _EngineDatasTransport) {
    if (datas.canvas && datas.canvasContext) {
      datas.canvasContext.beginPath();
      datas.canvasContext.arc(
        entity.transform.position.x,
        entity.transform.position.y,
        20,
        0,
        Math.PI * 2,
        true
      );
      datas.canvasContext.fillStyle = "#FFFF0022";
      datas.canvasContext.fill();
      datas.canvasContext.closePath();
    }
  }
}

export default HomeRenderer;
