import Vector2 from "../../../Engine/Maths/Vector2";
import Entity from "../../Entity";
import HomeRenderer from "./HomeRenderer";

class Home extends Entity {
  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new HomeRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;
  }
}

export default Home;
