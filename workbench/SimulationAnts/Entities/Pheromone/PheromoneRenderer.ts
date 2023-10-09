import Color from "@core/Color";
import Circle from "@core/Draw/Circle";
import Engine from "@core/Engine";
import MathUtils from "@core/Utils/Math";
import RenderComponent from "@core/Components/DefaultComponents/RenderComponent";

import Pheromone from "./Pheromone";

class PheromoneRenderer extends RenderComponent {
  render(pheromone: Pheromone) {
    if (Engine.datas.canvas && Engine.datas.canvasContext) {
      if (pheromone.strength > 0) {
        let size = (pheromone.strength * 5 / pheromone.maxStrength);
        let color = pheromone.foodDirection ? Color.Grey : Color.Yellow;

        color.opacity = MathUtils.mapRange(pheromone.maxStrength / pheromone.strength, 0, 1, 0, 255);

        let circle = new Circle(pheromone.transform.position, size / 5, color);
        circle.draw(Engine.datas.canvasContext);

      }
    }
  }
}

export default PheromoneRenderer;
