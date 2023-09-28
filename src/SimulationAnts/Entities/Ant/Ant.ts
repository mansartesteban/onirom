import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import MathUtils from "../../../Utils/Math";
import Entity from "../../Entity";
import AntRenderer from "./AntRenderer";

const dispersion = 5;
const speed = .2;

class Ant extends Entity {

    datas: { [name: string]: any } = {};

    constructor(position: Vector2 = new Vector2(), velocity: Vector2 = new Vector2()) {
        super(new AntRenderer());

        this.transform.position = position;
        this.transform.velocity = velocity;

    }

    initialize(datas: _EngineDatasTransport) {
        if (datas.canvas) {
            this.datas.target = new Vector2(
                MathUtils.random(0, datas.canvas.clientWidth),
                MathUtils.random(0, datas.canvas.clientHeight)
            )
        }
    }

    updateEntity(datas: _EngineDatasTransport) {

        if (datas.canvas && datas.canvasContext) {

            if (this.datas.initialized === undefined) {
                this.datas.initialized = true;
                this.initialize(datas);
            } else {
                // let minX = MathUtils.clamp(dispersion, -this.datas.target.x, datas.canvas.clientWidth - this.datas.target.x);
                // let maxX = MathUtils.clamp(dispersion, -this.datas.target.x, datas.canvas.clientWidth - this.datas.target.x);

                // let minY = MathUtils.clamp(dispersion, -this.datas.target.y, datas.canvas.clientHeight - this.datas.target.y);
                // let maxY = MathUtils.clamp(dispersion, -this.datas.target.y, datas.canvas.clientHeight - this.datas.target.y);

                // console.log(minX, maxX, minY, maxY, a, this.datas.target)


                let minX = -dispersion;
                if (this.datas.target.x - minX < 0) minX = this.datas.target.x;

                let maxX = -dispersion;
                if (this.datas.target.x + maxX > datas.canvas.clientWidth) maxX = datas.canvas.clientWidth - this.datas.target.x

                let minY = -dispersion;
                if (this.datas.target.y - minY < 0) minY = this.datas.target.y;

                let maxY = -dispersion;
                if (this.datas.target.y + maxY > datas.canvas.clientHeight) maxY = datas.canvas.clientHeight - this.datas.target.y

                let a = new Vector2(MathUtils.random(-minX, maxX), MathUtils.random(-minY, maxY))

                this.datas.target = this.datas.target.add(a);
            }

            let direction = Vector2.from(this.transform.position).to(this.datas.target).normalized.multiply(speed);
            // console.log("direction", direction, this.transform.position, this.datas.target)

            // datas.canvasContext.beginPath();
            // datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
            // datas.canvasContext.lineTo(this.transform.position.x + direction.x, this.transform.position.y + direction.y);
            // datas.canvasContext.strokeStyle = "#BB885544";
            // datas.canvasContext.lineWidth = 9;
            // datas.canvasContext.stroke();

            // datas.canvasContext.beginPath();
            // datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
            // datas.canvasContext.lineTo(this.datas.target.x, this.datas.target.y);
            // datas.canvasContext.lineWidth = 3;
            // datas.canvasContext.strokeStyle = "#88BB5544";
            // datas.canvasContext.stroke();

            // datas.canvasContext.fillStyle = "#00ff00";
            // datas.canvasContext.fillRect(this.datas.target.x - 3, this.datas.target.y - 3, 6, 6)


            this.transform.position.x += direction.x;
            this.transform.position.y += direction.y;
        }

    }

}

export default Ant;