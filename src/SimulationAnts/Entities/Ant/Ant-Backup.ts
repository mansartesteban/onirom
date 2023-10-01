import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import MathUtils from "../../../Utils/Math";
import Entity from "../../Entity";
import Scene from "../../Scene";
import Food from "../Food/Food";
import Home from "../Home/Home";
import Pheromone from "../Pheromone/Pheromone";
import AntRenderer from "./AntRenderer";

class Ant extends Entity {

  dispersion: number;
  speed: number;
  food: number = 0;
  autonomy: number = 100000;
  eating: number = 0;
  age: number = 0;

  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new AntRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;

    this.dispersion = 80;
    this.speed = 5 + Math.random() / 2;
  }

  initialize(datas: _EngineDatasTransport) {
    if (datas.canvas) {
      this.datas.target = new Vector2(
        MathUtils.random(0, datas.canvas.clientWidth),
        MathUtils.random(0, datas.canvas.clientHeight)
      );
    }
  }

  /*
  TODO:

  isAtHome
  wander
  newTarget
  leavePheromone
  searchPath
  updateSensors
  eat
  sleep
  isHomeClose
  isFoodClose

  */

  wander() {

  }

  isAtHome(home: Home) {
    return (
      Vector2.from(this.transform.position).to(home.transform.position).length <
      1
    );
  }

  storeFood(home: Home): void {
    this.food = 0;
    home.food += 1000;
  }

  heal(datas: _EngineDatasTransport, home: Home) {
    let toEat = MathUtils.clamp(home.food, 0, 1000);
    home.food -= toEat;
    this.autonomy += toEat;
    if (this.autonomy <= 0) {
      if (datas.scene) {
        this.delete(datas.scene);
      }
    }
  }

  getSpeed() {
    return this.speed + this.autonomy / 100000;
  }

  updateEntity(datas: _EngineDatasTransport) {

    this.age++;

    if (this.autonomy > 0) {
      this.autonomy--;
    }

    if (datas.tick !== undefined && datas.tick % 1 === 0) {
      datas.scene?.addEntity(new Pheromone(this.transform.position, this.food > 0));
    }
    if (datas.canvas && datas.canvasContext && datas.tick) {
      if (this.datas.initialized === undefined) {
        this.datas.initialized = true;
        this.initialize(datas);
      } else {
        if (this.eating && datas.tick - 50 <= this.eating) {
          this.datas.target = new Vector2();
        } else {
          this.eating = 0;
          let home = datas.scene?.entities.find(
            (entity) => entity instanceof Home
          ) as Home;

          if (!home) {
            throw "no home";
          }

          if (this.isAtHome(home)) {
            if (this.food > 0) {
              this.storeFood(home);
            } else if (this.autonomy <= 0) {
              this.heal(datas, home);
            }
          } else {
            if (this.food > 0 && Vector2.from(home.transform.position).to(this.transform.position).length < 50) {
              this.datas.target = home?.transform.position;
            } else {
              let feed = datas.scene?.entities.filter(
                (entity) => entity instanceof Food
              );
              let closest: Food | null = null;
              feed?.forEach((food) => {
                if (closest === null) {
                  closest = food as Food;
                } else {
                  let distance = Vector2.from(this.transform.position).to(
                    food.transform.position
                  ).length;
                  if (
                    distance <
                    Vector2.from(this.transform.position).to(
                      closest.transform.position
                    ).length
                  ) {
                    closest = food as Food;
                  }
                }
              });

              let hasFoodInSight = false;

              if (closest !== null) {
                let closestDistance = Vector2.from(this.transform.position).to(
                  (closest as Food).transform.position
                ).length;
                if (closestDistance < 80 && (closest as Food).food > 0) {
                  hasFoodInSight = true;
                  if (closestDistance < 5 && (closest as Food).food > 0) {
                    (closest as Food).eat(this);
                    this.eating = datas.tick;
                    this.autonomy += 250;
                  }
                  this.datas.target = (closest as Food).transform.position;
                }
              }

              if (!hasFoodInSight) {
                if (this.autonomy <= 0) {
                  this.datas.target = home?.transform.position;
                } else {
                  let minX = -this.dispersion;
                  if (this.datas.target.x - minX < 0)
                    minX = this.datas.target.x;

                  let maxX = -this.dispersion;
                  if (this.datas.target.x + maxX > datas.canvas.clientWidth)
                    maxX = datas.canvas.clientWidth - this.datas.target.x;

                  let minY = -this.dispersion;
                  if (this.datas.target.y - minY < 0)
                    minY = this.datas.target.y;

                  let maxY = -this.dispersion;
                  if (this.datas.target.y + maxY > datas.canvas.clientHeight)
                    maxY = datas.canvas.clientHeight - this.datas.target.y;

                  let a = new Vector2(
                    MathUtils.random(-minX, maxX),
                    MathUtils.random(-minY, maxY)
                  );

                  this.datas.target = this.datas.target.add(a);
                }
              }
            }
          }
        }
      }

      let direction = Vector2.from(this.transform.position)
        .to(this.datas.target)
        .normalized;

      function degreesToRadians(degrees: number = 0) {
        return degrees * Math.PI / 180;
      }

      if (datas.scene) {

        let sensorFront = direction.normalized;

        let sensorLeft = new Vector2(
          Math.cos(degreesToRadians(-30)) * sensorFront.x - Math.sin(degreesToRadians(-30)) * sensorFront.y,
          Math.sin(degreesToRadians(-30)) * sensorFront.x + Math.cos(degreesToRadians(-30)) * sensorFront.y,
        );
        let sensorRight = new Vector2(
          Math.cos(degreesToRadians(30)) * sensorFront.x - Math.sin(degreesToRadians(30)) * sensorFront.y,
          Math.sin(degreesToRadians(30)) * sensorFront.x + Math.cos(degreesToRadians(30)) * sensorFront.y,
        );

        sensorFront = sensorFront.multiply(30).add(this.transform.position);
        sensorLeft = sensorLeft.multiply(30).add(this.transform.position);
        sensorRight = sensorRight.multiply(30).add(this.transform.position);

        direction = this.getDirection(datas.scene, sensorFront, sensorLeft, sensorRight, this.food > 0);

        // console.log(direction)

        datas.canvasContext.beginPath();
        datas.canvasContext.arc(
          sensorFront.x,
          sensorFront.y,
          10,
          0,
          Math.PI * 2,
          true
        );
        datas.canvasContext.fillStyle = "#00ffff";
        datas.canvasContext.fill();
        datas.canvasContext.closePath();

        datas.canvasContext.beginPath();
        datas.canvasContext.arc(
          sensorLeft.x,
          sensorLeft.y,
          10,
          0,
          Math.PI * 2,
          true
        );
        datas.canvasContext.fillStyle = "#ff00ff";
        datas.canvasContext.fill();
        datas.canvasContext.closePath();

        datas.canvasContext.beginPath();
        datas.canvasContext.arc(
          sensorRight.x,
          sensorRight.y,
          10,
          0,
          Math.PI * 2,
          true
        );

        datas.canvasContext.fillStyle = "#0000ff";
        datas.canvasContext.fill();
        datas.canvasContext.closePath();
      }

      // console.log("direction", direction, this.transform.position, this.datas.target)

      datas.canvasContext.beginPath();
      datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
      datas.canvasContext.lineTo(this.transform.position.x + direction.x, this.transform.position.y + direction.y);
      datas.canvasContext.strokeStyle = "#BB8855aa";
      datas.canvasContext.lineWidth = 9;
      datas.canvasContext.stroke();
      datas.canvasContext.closePath();

      datas.canvasContext.beginPath();
      datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
      datas.canvasContext.lineTo(this.datas.target.x, this.datas.target.y);
      datas.canvasContext.lineWidth = 3;
      datas.canvasContext.strokeStyle = "#88BB5544";
      datas.canvasContext.stroke();
      datas.canvasContext.closePath();

      datas.canvasContext.fillStyle = "#ffffff";
      datas.canvasContext.fillRect(this.datas.target.x - 3, this.datas.target.y - 3, 6, 6);

      direction = direction.multiply(this.getSpeed());

      this.transform.position = this.transform.position.lerp(this.datas.target, .1);
    }
  }

  getDirection(scene: Scene, sensorFront: Vector2, sensorLeft: Vector2, sensorRight: Vector2, hasFood: Boolean) {
    // let direction = Vector2.from(this.transform.position)
    //   .to(this.datas.target)
    //   .normalized.multiply(this.getSpeed());

    let pheromonesForFront = scene.entities.filter((entity: Entity) => {
      if (entity instanceof Pheromone) {
        // console.log("oui phero")
        let pheromone = entity as Pheromone;
        if (pheromone.foodDirection !== hasFood) {
          if (Vector2.from(sensorFront).to(pheromone.transform.position).length <= 10) {
            return true;
          }
        }
      }
      return false;
    });

    let pheromonesForLeft = scene.entities.filter((entity: Entity) => {
      if (entity instanceof Pheromone) {
        let pheromone = entity as Pheromone;
        if (pheromone.foodDirection !== hasFood) {
          if (Vector2.from(sensorLeft).to(pheromone.transform.position).length <= 10) {
            return true;
          }
        }
      }
      return false;
    });

    let pheromonesForRight = scene.entities.filter((entity: Entity) => {
      if (entity instanceof Pheromone) {
        let pheromone = entity as Pheromone;
        if (pheromone.foodDirection !== hasFood) {
          if (Vector2.from(sensorRight).to(pheromone.transform.position).length <= 10) {
            return true;
          }
        }
      }
      return false;
    });
    let pheromonesForFrontConcentration = (pheromonesForFront as Pheromone[]).reduce((acc: number, v: Pheromone) => acc + v.strength, 0);
    let pheromonesForLeftConcentration = (pheromonesForLeft as Pheromone[]).reduce((acc: number, v: Pheromone) => acc + v.strength, 0);
    let pheromonesForRightConcentration = (pheromonesForRight as Pheromone[]).reduce((acc: number, v: Pheromone) => acc + v.strength, 0);



    if (pheromonesForRightConcentration >= pheromonesForLeftConcentration && pheromonesForRightConcentration > pheromonesForFrontConcentration) {
      return sensorRight.normalized;
    }
    if (pheromonesForLeftConcentration >= pheromonesForRightConcentration && pheromonesForLeftConcentration > pheromonesForFrontConcentration) {
      return sensorLeft.normalized;
    }
    return sensorFront.normalized;

  }
}

export default Ant;
