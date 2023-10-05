import Color from "@core/Color";
import Circle from "@core/Draw/Circle";
import Engine from "@core/Engine";
import RenderComponent from "@core/Components/DefaultComponents/RenderComponent";
import Entity from "@core/Entity";

import Food from "./Food";

class FoodRenderer extends RenderComponent {

  shape: Circle;

  constructor() {
    super();

    this.shape = new Circle();
  }

  render(entity: Entity) {
    if (Engine.datas.canvas && Engine.datas.canvasContext) {
      let food = (entity as Food);

      this.shape.position = entity.transform.position;
      this.shape.color = food.isAimed ? Color.Green : Color.Red;
      this.shape.radius = (food.food < 0 ? 0 : food.food) / 5;

      this.shape.draw(Engine.datas.canvasContext);
    }
  }
}

export default FoodRenderer;
