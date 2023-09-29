import { _EngineDatasTransport } from "../../..";
import Vector2 from "../../../Engine/Maths/Vector2";
import MathUtils from "../../../Utils/Math";
import Entity from "../../Entity";
import Food from "../Food/Food";
import Home from "../Home/Home";
import Pheromone from "../Pheromone/Pheromone";
import AntRenderer from "./AntRenderer";

class Ant extends Entity {
  datas: { [name: string]: any } = {};

  dispersion: number;
  speed: number;
  food: number = 0;
  autonomy: number = 1000;
  eating: number = 0;

  constructor(
    position: Vector2 = new Vector2(),
    velocity: Vector2 = new Vector2()
  ) {
    super(new AntRenderer());

    this.transform.position = position;
    this.transform.velocity = velocity;

    this.dispersion = 20;
    this.speed = 1.5 + Math.random() / 2;
  }

  initialize(datas: _EngineDatasTransport) {
    if (datas.canvas) {
      this.datas.target = new Vector2(
        MathUtils.random(0, datas.canvas.clientWidth),
        MathUtils.random(0, datas.canvas.clientHeight)
      );
    }
  }

  isAtHome(home: Home) {
    return (
      Vector2.from(this.transform.position).to(home.transform.position).length <
      1
    );
  }

  storeFood(home: Home): void {
    this.food = 0;
    this.autonomy += 250;
  }

  heal() {
    this.autonomy = 1000;
  }

  getSpeed() {
    return this.speed + this.autonomy / 1000;
  }

  updateEntity(datas: _EngineDatasTransport) {
    if (this.autonomy > 0) {
      this.autonomy--;
    }

    if (datas.tick !== undefined && datas.tick % 20 === 0) {
      datas.scene?.addEntity(new Pheromone(this.transform.position));
    }
    if (datas.canvas && datas.canvasContext) {
      if (this.datas.initialized === undefined) {
        this.datas.initialized = true;
        this.initialize(datas);
      } else {
        if (!this.eating || datas.tick - 50 > this.eating) {
          this.eating = 0;
          let home = datas.scene?.entities.find(
            (entity) => entity instanceof Home
          );

          if (!home) {
            throw "no home";
          }

          if (this.isAtHome(home)) {
            if (this.food > 0) {
              this.storeFood(home);
            } else if (this.autonomy <= 0) {
              this.heal();
            }
          } else {
            if (this.food > 0) {
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
                  if (closestDistance < 1 && (closest as Food).food > 0) {
                    (closest as Food).eat(this);
                    this.eating = datas.tick;
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
        .normalized.multiply(this.getSpeed());
      // console.log("direction", direction, this.transform.position, this.datas.target)

      // datas.canvasContext.beginPath();
      // datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
      // datas.canvasContext.lineTo(this.transform.position.x + direction.x, this.transform.position.y + direction.y);
      // datas.canvasContext.strokeStyle = "#BB885544";
      // datas.canvasContext.lineWidth = 9;
      // datas.canvasContext.stroke();

      // datas.canvasContext.beginPath();
      // datas.canvasContext.moveTo(this.transform.position.x, this.transform.position.y);
      // datas.canvasContext.lineTo(this.datas.target.x, this.datas.target.y);
      // datas.canvasContext.lineWidth = 3;
      // datas.canvasContext.strokeStyle = "#88BB5544";
      // datas.canvasContext.stroke();

      // datas.canvasContext.fillStyle = "#00ff00";
      // datas.canvasContext.fillRect(this.datas.target.x - 3, this.datas.target.y - 3, 6, 6)

      this.transform.velocity.x = direction.x;
      this.transform.velocity.y = direction.y;
    }
  }
}

export default Ant;
