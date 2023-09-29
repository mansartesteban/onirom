import { _EngineDatasTransport } from "../../..";
import MathUtils from "../../../Utils/Math";
import RenderComponent from "../../Components/RenderComponent";
import Pheromone from "./Pheromone";

class PheromoneRenderer extends RenderComponent {
  render(ant: Pheromone, datas: _EngineDatasTransport) {
    if (datas.canvas && datas.canvasContext) {
      if (ant.strength > 0) {
        let size = ant.strength / ant.maxStrength;
        datas.canvasContext.fillStyle =
          "#00ff00" +
          parseInt(
            MathUtils.mapRange(
              ant.strength,
              0,
              ant.maxStrength,
              0,
              255
            ).toFixed(0)
          )
            .toString(16)
            .padStart(2, "0");
        datas.canvasContext.fillRect(
          ant.transform.position.x - size / 2,
          ant.transform.position.y - size / 2,
          size,
          size
        );
        datas.canvasContext.closePath();
      }
    }
  }
}

export default PheromoneRenderer;
