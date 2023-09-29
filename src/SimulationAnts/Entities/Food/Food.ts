import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import Ant from "../Ant/Ant";
import FoodRenderer from "./FoodRenderer";

class Food extends Entity {
  food: number = 20;

  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new FoodRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;
  }

  eat(ant: Ant) {
    ant.food++;
    this.food--;
  }

  updateEntity(datas: _EngineDatasTransport) {
    if (datas.scene && this.food < 0) {
      this.delete(datas.scene);
    }
  }
}

export default Food;
