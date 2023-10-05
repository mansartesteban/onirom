import Engine from "@core/Engine";
import Map from "@core/Map";
import Scene from "@core/Scene";

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }

  const engine = new Engine(app);

  engine.setup(async () => {
    Scene.initialize(Engine.datas.canvasContext);

    Map.displayGrid();

    window.addEventListener("click", (e) => {
      e.preventDefault();
      Map.grid.zoom += .1;
    });
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      Map.grid.zoom -= .1;
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
- Créer une classe animation qui peut gérer la vitesse de l'animation
- Gérer les actions séquencées (comme ThinMatrix)
- Créer un assethandler ? Pour éviter d'instancier 1000 fois le render de pheromones ou de food,
  pareil pour les fourmis en plus ça doit sûrement être lourd vu que ce sont des images

*/
