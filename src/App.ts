import { _EngineDatasTransport } from ".";
import Engine from "./Engine/Engine";
import Vector2 from "./Engine/Maths/Vector2";
import Ant from "./SimulationAnts/Entities/Ant/Ant";
import Food from "./SimulationAnts/Entities/Food/Food";
import Home from "./SimulationAnts/Entities/Home/Home";
import Scene from "./SimulationAnts/Scene";
import MathUtils from "./Utils/Math";

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }

  const engine = new Engine(app);

  engine.setup(async (ctx: CanvasRenderingContext2D) => {
    const scene = new Scene(ctx);

    const ants: Ant[] = [];

    let home = new Home(
      new Vector2(window.innerWidth / 2, window.innerHeight / 2)
    );
    scene.addEntity(home);

    for (let i = 0; i < 200; i++) {
      let ant = new Ant(
        new Vector2(home.transform.velocity.x, home.transform.position.y)
      );
      scene.addEntity(ant);
      ants.push(ant);
    }

    for (let i = 0; i < 100; i++) {
      let food = new Food(
        new Vector2(
          MathUtils.random(0, window.innerWidth),
          MathUtils.random(0, window.innerHeight)
        )
      );
      scene.addEntity(food);
    }

    window.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      scene.addEntity(new Food(new Vector2(e.clientX, e.clientY)));
    });
    window.addEventListener("click", (e: MouseEvent) => {
      // ants.forEach(
      //   (ant) => (ant.datas.target = new Vector2(e.clientX, e.clientY))
      // );

      let direction = Vector2.from(home.transform.position)
        .to(new Vector2(e.clientX, e.clientY))
        .multiply(0.1);

      home.transform.velocity.x = direction.x;
      home.transform.velocity.y = direction.y;
    });

    return {
      scene,
    };
  });

  engine.loop((datas: _EngineDatasTransport) => {
    datas.canvasContext?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  });
};
