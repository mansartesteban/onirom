import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import MathUtils from "../../../Utils/Math";
import Entity from "../../Entity";
import AntRenderer from "./AntRenderer";

class Ant extends Entity {

    constructor(position: Vector2 = new Vector2(), velocity: Vector2 = new Vector2()) {
        super(new AntRenderer());

        this.transform.position = position;
        this.transform.velocity = velocity;
    }

    updateEntity(datas: _EngineDatasTransport) {

        this.transform.position.x += MathUtils.random(-1, 1);
        this.transform.position.y += MathUtils.random(-1, 1);

    }

}

export default Ant;