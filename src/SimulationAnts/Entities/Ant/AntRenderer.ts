import Sprite from "../../../Engine/Draw/Sprite";
import Engine from "../../../Engine/Engine";
import Map from "../../../Engine/Map";
import Rotation from "../../../Engine/Maths/Rotation";
import RenderComponent from "../../Components/RenderComponent";
import Entity from "../../Entity";

class AntRenderer extends RenderComponent {

  #sprite: Sprite;
  #animationSpeed = 3;

  constructor() {
    super();

    this.#sprite = new Sprite("/assets/images/ant-sprite.png", {
      columns: 8,
      rows: 8,
      count: 62,
      scale: .05,
      offsetRotation: new Rotation(Math.PI / 2, true)
    });
  }

  render(entity: Entity) {
    const ctx = Engine.datas.canvasContext;
    if (ctx) {

      this.#sprite.next(this.#animationSpeed);
      this.#sprite.draw(ctx, entity.transform.position, entity.transform.rotation);

    }
  }
}

export default AntRenderer;
