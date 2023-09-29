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

  removeEntity(entityToDelete: Entity) {
    const foundIndex = this.entities.findIndex(
      (entity) => entity === entityToDelete
    );
    if (foundIndex) {
      //   this.entities = this.entities.filter((v, k) => k !== foundIndex);
      this.entities.splice(foundIndex, 1);
    }
  }

  update(datas: _EngineDatasTransport) {
    if (datas.canvasContext !== undefined) {
      this.entities.forEach((entity) => entity.update(datas));
    }
  }
}

export default Scene;
