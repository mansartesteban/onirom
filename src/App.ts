import { _EngineDatasTransport } from ".";
import Engine from "./Engine/Engine";
import Map from "./Engine/Map";
import Vector2 from "./Engine/Maths/Vector2";
import Ant from "./SimulationAnts/Entities/Ant/Ant";
import Food from "./SimulationAnts/Entities/Food/Food";
import Scene from "./SimulationAnts/Scene";
import MathUtils from "./Utils/Math";

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }


  let v = new Vector2(10, 1);

  const engine = new Engine(app);

  engine.setup(async () => {

    Map.displayGrid();

    Scene.initialize(Engine.datas.canvasContext);

    const ants: Ant[] = [];

    for (let i = 0;i < 1;i++) {
      let ant = new Ant(
        new Vector2()
      );
      Scene.addEntity(ant);
      ants.push(ant);
    }

    for (let i = 0;i < 20;i++) {
      let food = new Food(
        new Vector2(
          MathUtils.random(Map.xMin, Map.xMax),
          MathUtils.random(Map.yMin, Map.yMax)
        )
      );
      Scene.addEntity(food);
    }

    window.addEventListener("mousemove", e => {
      ants.forEach(ant => {
        let mousePosition = Map.getMapCoordinates(new Vector2(e.clientX, e.clientY));
        mousePosition.clampLength(200);

        ant.datas.target = Map.getMapCoordinates(new Vector2(e.clientX, e.clientY));
      });
    });

    return {
      Scene,
    };
  });

  engine.loop(() => {
  });
};



/*
TODO:
- Document Rotation class
- Document Color class
- Créer Mouse qui récupère la position sur le screen et qui la translate sur la map
*/