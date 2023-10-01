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

    for (let i = 0;i < 50;i++) {
      let ant = new Ant(
        new Vector2(MathUtils.random(Map.xMin, Map.xMax), MathUtils.random(Map.yMin, Map.yMax))
      );
      Scene.addEntity(ant);
      ants.push(ant);
    }

    for (let i = 0;i < 200;i++) {
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

Simulation fourmis :
- Gérer le Timer sur le déplacement de la fourmi et tester avec une framerate à 1FPS
- Possibilité de récupérer la nourriture et se déplacer avec
- Essayer de faire matrcher la vitesse de l'animation de la fourmi avec sa vitesse de déplacement
- Gérer les layers ? Les pheromones sont affichées par dessus les fourmis puisqu'elles sont crées après mais on devrait voir les fourmis passer par dessus
- Pour l'affichage des pheromones, essayer de créer un tableau de positions qui sera draw 1 seule fois plutôt que de redraw 1000 point différents
- Faire en sorte que les fourmis s'arrêtent à un point plutôt qu'elles fassent des aller/retours 

Général
- Document Rotation class
- Document Color class
- Créer Mouse qui récupère la position sur le screen et qui la translate sur la map
- Créer une classe animation qui peut gérer la vitesse de l'animation
- Gérer les actions séquencées (comme ThinMatrix)
- Créer un assethandler ? Pour éviter d'instancier 1000 fois le render de pheromones ou de food,
  pareil pour les fourmis en plus ça doit sûrement être lourd vu que ce sont des images

Organisation
- Créer un Trello organisé comme ThinMatrix
*/