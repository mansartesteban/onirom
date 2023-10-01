import Color from "../../../Engine/Color";
import Circle from "../../../Engine/Draw/Circle";
import Engine from "../../../Engine/Engine";
import Map from "../../../Engine/Map";
import Rotation from "../../../Engine/Maths/Rotation";
import Vector2 from "../../../Engine/Maths/Vector2";
import Time from "../../../Engine/Time";
import Timer from "../../../Engine/Timer";
import Entity from "../../Entity";
import Scene from "../../Scene";
import Food from "../Food/Food";
import Pheromone from "../Pheromone/Pheromone";
import AntRenderer from "./AntRenderer";

class Ant extends Entity {

    dispersion: number = 80;
    food: number = 0;
    autonomy: number = 100000;
    eating: number = 0;
    age: number = 0;
    hasFoodInSight: Boolean = false;

    sensors: Vector2[] = [];

    maxSpeed: number = 2;
    steerForce: number = .05;

    constructor(
        position: Vector2 = new Vector2()
    ) {
        super(new AntRenderer());

        this.transform.position = position;
        this.transform.velocity = new Vector2();
        this.datas.target = new Vector2();

    }

    goToTarget() {

        let direction = Vector2.from(this.transform.position).to(this.datas.target).normalize();

        let maxVelocity = direction.copy().multiply(this.maxSpeed);
        let steeringForce = maxVelocity.sub(this.transform.velocity).multiply(this.steerForce);
        let acceleration = steeringForce.clampLength(this.steerForce);

        // new Vector2(0, maxVelocity.copy().multiply(1000).length).debug(Engine.datas.canvasContext, new Vector2(0, 0), Color.Red);
        // new Vector2(20, steeringForce.copy().multiply(1000).length).debug(Engine.datas.canvasContext, new Vector2(20, 0), Color.Green);
        // new Vector2(40, acceleration.copy().multiply(1000).length).debug(Engine.datas.canvasContext, new Vector2(40, 0), Color.Blue);
        // new Vector2(60, this.transform.velocity.copy().multiply(100).length).debug(Engine.datas.canvasContext, new Vector2(60, 0), Color.Yellow);

        this.transform.velocity.add(acceleration).clampLength(this.maxSpeed);
        this.transform.rotation = this.transform.velocity.rotation;
    }

    updateSensors() {
        let direction = this.transform.velocity.copy().normalized;

        let sensorFront = direction.copy();
        let sensorLeft = direction.copy().rotate(new Rotation(-30));
        let sensorRight = direction.copy().rotate(new Rotation(30));

        sensorFront = sensorFront.copy().multiply(30).add(this.transform.position);
        sensorLeft = sensorLeft.copy().multiply(30).add(this.transform.position);
        sensorRight = sensorRight.copy().multiply(30).add(this.transform.position);

        // let circleFront = new Circle(sensorFront, 10, Color.Cyan);
        // let circleLeft = new Circle(sensorLeft, 10, Color.Fuchsia);
        // let circleRight = new Circle(sensorRight, 10, Color.Blue);

        // circleFront.draw(Engine.datas.canvasContext);
        // circleLeft.draw(Engine.datas.canvasContext);
        // circleRight.draw(Engine.datas.canvasContext);
    }

    leavePheromone() {

        if (!this.datas.timer) {
            this.datas.timer = new Timer();
            (this.datas.timer as Timer).executeEach(Time.OneMilisecond * 500, () => {
                let pheromone = new Pheromone(this.transform.position, this.food > 0);
                Scene.addEntity(pheromone);
            });
        }

    }

    goLeft() {

    }
    goRight() {

    }
    goForward() {

    }

    smellFood() {
        let feed: Food[] = Scene.entities.filter((entity: Entity) => entity instanceof Food) as Food[];
        feed.forEach(food => {
            if (!this.hasFoodInSight && Vector2.from(food.transform.position).to(this.transform.position).length < 50) {
                this.datas.target = food.transform.position;
                food.isAimed = true;
                this.hasFoodInSight = true;

            } else {
                // food.isAimed = false;
            }
        });
    }

    updateEntity() {
        this.goToTarget();

        this.smellFood();
        this.leavePheromone();
        this.updateSensors();
    }


    /*
    TODO:
  
    OK newTarget
    OK leavePheromone
    isAtHome
    wander
    searchPath
    updateSensors
    eat
    sleep
    isHomeClose
    isFoodClose
  
    */

}

export default Ant;