import { _EngineDatasTransport } from ".";
import Color from "./Engine/Color";
import Circle from "./Engine/Draw/Circle";
import CircleScreen from "./Engine/Draw/CircleScreen";
import Engine from "./Engine/Engine";
import Mouse from "./Engine/Inputs/Mouse";
import Map from "./Engine/Map";
import Rotation from "./Engine/Maths/Rotation";
import Vector2 from "./Engine/Maths/Vector2";
import Time from "./Engine/Time";
import Timer from "./Engine/Timer";
import Ant from "./SimulationAnts/Entities/Ant/Ant";
import Food from "./SimulationAnts/Entities/Food/Food";
import Scene from "./SimulationAnts/Scene";
import MathUtils from "./Utils/Math";

const ants: Ant[] = [];

let circle = new CircleScreen(new Vector2(), 10, Color.Red);

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }

  const engine = new Engine(app);

  engine.setup(async () => {

    Scene.initialize(Engine.datas.canvasContext);

    Map.displayGrid();

    let timer = new Timer();

    timer.executeEach(Time.OneMilisecond * 100, () => {
      Map.origin = Map.origin.copy().add(10);
      Map.grid.tileSize += 1;
    });

    // let eachTen = new CircleScreen(new Vector2(), 1, Color.Green);
    // let cOriginOfMap = new Circle(Map.origin.copy().add(Map.size), 5, Color.Cyan);
    // let cOriginOnScreen = new CircleScreen(Map.size, 5, Color.Yellow);
    // Map.drawGrid();

    // cOriginOfMap.draw(Scene.canvas);
    // cOriginOnScreen.draw(Scene.canvas);


    // for (let i = 0;i < Map.size.x;i++) {
    //   eachTen.position.x = i;
    //   eachTen.position.y = Map.size.y / 2;
    //   if (i % Map.grid.tileSize === 0) {
    //     eachTen.draw(Scene.canvas);
    //   }
    // }

    // for (let i = 0;i < Map.size.y;i++) {
    //   eachTen.position.y = i;
    //   eachTen.position.x = Map.size.x / 2;
    //   if (i % Map.grid.tileSize === 0) {
    //     eachTen.draw(Scene.canvas);
    //   }
    // }
    // for (let i = 0;i < 30;i++) {
    //   let ant = new Ant(
    //     new Vector2(MathUtils.random(Map.xMin, Map.xMax), MathUtils.random(Map.yMin, Map.yMax))
    //   );
    //   // ant.transform.acceleration.x = 1;
    //   Scene.addEntity(ant);
    //   ants.push(ant);
    // }

    // for (let i = 0;i < 200;i++) {
    //   let food = new Food(
    //     new Vector2(
    //       MathUtils.random(Map.xMin, Map.xMax),
    //       MathUtils.random(Map.yMin, Map.yMax)
    //     )
    //   );
    //   Scene.addEntity(food);
    // }

    // Mouse.onMove(() => {
    //   ants.forEach(ant => {
    //     ant.datas.target = ;
    //   });
    // });

    // Mouse.onClick(() => {
    //   circle.position = Mouse.position;
    // });

    return {
      Scene,
    };
  });

  engine.loop(() => {
    circle.draw(Scene.canvas);

  });
};

/*
TODO:
NOTE:
FIXME:
ERROR:
FINISHED:
Simulation fourmis :
- Possibilité de récupérer la nourriture et se déplacer avec
- Essayer de faire matrcher la vitesse de l'animation de la fourmi avec sa vitesse de déplacement
- Gérer les layers ? Les pheromones sont affichées par dessus les fourmis puisqu'elles sont crées après mais on devrait voir les fourmis passer par dessus
- Pour l'affichage des pheromones, essayer de créer un tableau de positions qui sera draw 1 seule fois plutôt que de redraw 1000 point différents
- Faire en sorte que les fourmis s'arrêtent à un point plutôt qu'elles fassent des aller/retours
- Corriger le debugVector avec une faible valeur

Général
- Créer Mouse qui récupère la position sur le screen et qui la translate sur la map
- Créer une classe animation qui peut gérer la vitesse de l'animation
- Gérer les actions séquencées (comme ThinMatrix)
- Créer un assethandler ? Pour éviter d'instancier 1000 fois le render de pheromones ou de food,
  pareil pour les fourmis en plus ça doit sûrement être lourd vu que ce sont des images

*/
