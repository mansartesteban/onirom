import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import Ant from "../Ant/Ant-Backup";
import FoodRenderer from "./FoodRenderer";

class Food extends Entity {

  food: number = 20;
  isAimed: Boolean = false;

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

  updateEntity() {
    if (this.food < 0) {
      this.delete();
    }
  }
}

export default Food;
