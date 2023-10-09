
import Mouse from "@core/Inputs/Mouse";
import Rotation from "@core/Maths/Rotation";
import Vector2 from "@core/Maths/Vector2";
import Time from "@/Engine/Core/Time/Time";
import Timer from "@/Engine/Core/Time/Timer";
import Entity from "@core/Entity";
import Scene from "@core/Scene";

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

    maxSpeed: number = .1;
    steerStrength: number = .05;

    constructor(
        position: Vector2 = new Vector2()
    ) {
        super(new AntRenderer());

        this.transform.position = position;
        this.transform.velocity = new Vector2();
        this.datas.target = new Vector2();

    }

    goToTarget() {

        this.datas.target = Mouse.position;
        let direction = Vector2.from(this.transform.position).to(this.datas.target);

        if (direction.length > 1) {

            const desiredVelocity = direction.normalized.multiply(this.maxSpeed);
            const desiredSteeringForce = desiredVelocity.sub(this.transform.velocity).multiply(this.steerStrength);

            this.transform.acceleration = desiredSteeringForce.clampLength(Math.min(this.steerStrength, direction.length / 10));
            this.transform.velocity = this.transform.velocity.copy().add(this.transform.acceleration.copy().multiply(Time.deltaTime)).clampLength(Math.min(this.maxSpeed, direction.length));
            this.transform.position.add(this.transform.velocity.copy().multiply(Time.deltaTime));

            this.transform.rotation = this.transform.velocity.rotation;
        }
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

        // this.smellFood();
        // this.leavePheromone();
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