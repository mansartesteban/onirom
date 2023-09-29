import { _EngineDatasTransport } from ".";
import Engine from "./Engine/Engine";
import Vector2 from "./Engine/Maths/Vector2";
import Ant from "./SimulationAnts/Entities/Ant/Ant";
import Scene from "./SimulationAnts/Scene";

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }

  const engine = new Engine(app);

  engine.setup(async (ctx: CanvasRenderingContext2D) => {
    const scene = new Scene(ctx);

    const ants: Ant[] = [];

    // for (let i = 0; i < 200; i++) {
    //   let ant = new Ant(new Vector2(400, 400));
    //   scene.addEntity(ant);
    //   ants.push(ant);
    // }

    window.addEventListener("click", (e: MouseEvent) => {
      ants.forEach(
        (ant) => (ant.datas.target = new Vector2(e.clientX, e.clientY))
      );
      scene.addEntity(new Ant(new Vector2(e.clientX - 5, e.clientY - 5)));
    });

    return {
      scene,
    };
  });

  engine.loop((datas: _EngineDatasTransport) => {
    datas.canvasContext?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  });
};
