import Color from "../../../Engine/Color";
import Circle from "../../../Engine/Draw/Circle";
import Engine from "../../../Engine/Engine";
import RenderComponent from "../../Components/RenderComponent";
import Entity from "../../Entity";
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
