import Engine from "@core/Engine";
import RenderComponent from "@core/Components/DefaultComponents/RenderComponent";

import Home from "./Home";

class HomeRenderer extends RenderComponent {
  render(entity: Home) {
    if (Engine.datas.canvas && Engine.datas.canvasContext) {
      Engine.datas.canvasContext.beginPath();
      Engine.datas.canvasContext.arc(
        entity.transform.position.x,
        entity.transform.position.y,
        20,
        0,
        Math.PI * 2,
        true
      );
      Engine.datas.canvasContext.fillStyle = "#FFFF0022";
      Engine.datas.canvasContext.fill();
      Engine.datas.canvasContext.closePath();
    }
  }
}

export default HomeRenderer;
