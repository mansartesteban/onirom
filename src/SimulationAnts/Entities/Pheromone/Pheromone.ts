import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import PheromoneRenderer from "./PheromoneRenderer";

class Pheromone extends Entity {
  maxStrength: number = 100;
  strength: number = 0;

  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new PheromoneRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;

    this.strength = this.maxStrength;
  }

  updateEntity(datas: _EngineDatasTransport) {
    if (this.strength <= 0 && datas.scene) {
      this.delete(datas.scene);
    }
    this.strength -= 0.1;
  }
}

export default Pheromone;
