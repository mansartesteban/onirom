import Entity from "@core/Entity";

class Scene {

  static entities: Entity[];
  static canvas: CanvasRenderingContext2D;
  static initialized: Boolean = false;

  static initialize(canvas: CanvasRenderingContext2D) {
    Scene.canvas = canvas;
    Scene.entities = [];
    Scene.initialized = true;
  }

  static isInitilized() {
    if (!Scene.initialized) {
      throw "Scene class has not been initialized";
    }
  }

  static addEntity(entity: Entity) {
    Scene.isInitilized();
    Scene.entities.push(entity);
  }

  static removeEntity(entityToDelete: Entity) {
    Scene.isInitilized();
    const foundIndex = Scene.entities.findIndex(
      (entity) => entity === entityToDelete
    );
    if (foundIndex) {
      Scene.entities.splice(foundIndex, 1);
    }
  }

  static update() {
    Scene.isInitilized();
    Scene.entities.forEach((entity) => entity.update());
  }
}

export default Scene;
