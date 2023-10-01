import Map from "../../../Engine/Map";
import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import PheromoneRenderer from "./PheromoneRenderer";

class Pheromone extends Entity {

  maxStrength: number = 100;
  strength: number = 0;
  foodDirection: Boolean = false;

  constructor(
    position: Vector2 = new Vector2(),
    foodDirection: Boolean = false
  ) {
    super(new PheromoneRenderer());

    this.transform.position.set(position);
    this.transform.velocity = new Vector2();

    this.foodDirection = foodDirection;
    this.strength = this.maxStrength;
  }

  updateEntity() {
    if (this.strength <= 0) {
      this.delete();
    }
    this.strength -= 0.1;
  }
}

export default Pheromone;
