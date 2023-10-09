import Engine from "@/Engine/Core/Engine";
import Map from "@/Engine/Core/Map";
import Scene from "@/Engine/Core/Scene";

const setup = async () => {
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
};

const loop = () => {
};

export {
    setup,
    loop
};

/*
Simulation fourmis :
- Possibilité de récupérer la nourriture et se déplacer avec
- Essayer de faire matrcher la vitesse de l'animation de la fourmi avec sa vitesse de déplacement
- Gérer les layers ? Les pheromones sont affichées par dessus les fourmis puisqu'elles sont crées après mais on devrait voir les fourmis passer par dessus
- Pour l'affichage des pheromones, essayer de créer un tableau de positions qui sera draw 1 seule fois plutôt que de redraw 1000 point différents
- Faire en sorte que les fourmis s'arrêtent à un point plutôt qu'elles fassent des aller/retours
- Corriger le debugVector avec une faible valeur
*/