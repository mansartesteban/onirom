import Engine from "../../../Engine/Engine";
import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import HomeRenderer from "./HomeRenderer";

class Home extends Entity {

  datas: { [name: string]: any; } = {};

  food: number = 10000;

  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new HomeRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;
  }

  setTarget(target: Vector2) {
    this.datas.target = target;
  }

  updateEntity() {
    if (this.datas.target) {
      this.transform.position.lerp(this.datas.target, 0.1);
    }

    if (!this.datas.lastTick) {
      this.datas.lastTick = Engine.datas.tick;
    }


  }

}

export default Home;
