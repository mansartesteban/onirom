import { _EngineDatasTransport } from "..";
import Entity from "./Entity";

class Scene {

    entities: Entity[];
    canvas: CanvasRenderingContext2D;

    constructor(canvas: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.entities = [];
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    update(datas: _EngineDatasTransport) {
        if (datas.canvasContext !== undefined) {
            this.entities.forEach(entity => entity.update(datas));
        }
    }

}

export default Scene;