import { _EngineDatasTransport, _Updatable } from "..";
import Scene from "../SimulationAnts/Scene";
import Color from "./Color";
import Draw from "./Draw/Draw";
import Mouse from "./Inputs/Mouse";
import Map from "./Map";
import Vector2 from "./Maths/Vector2";
import Observer from "./Observer";
import Time from "./Time";
import Timer from "./Timer";

class Engine {
  #app: HTMLElement;
  #observer: Observer;
  #setupFinished: Boolean = false;
  #paused: Boolean = false;

  static #datas: { [name: string]: any; } = {};
  static initialized: Boolean = false;

  static #updatableObjects: _Updatable[] = [];

  constructor(app: HTMLElement) {
    this.#app = app;
    this.#observer = new Observer(["setup-finished", "initialized"]);
    this.#initializeEngine();
  }

  /**
   * @description Internal initialize function to create canvas or define settings
   * Emits an event when it has finished
   */
  #initializeEngine() {
    // Create base canvas
    const canvas = document.createElement("canvas");
    this.#app.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw "Unable to get context '2d' from canvas, aborting !";
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Update canvas size based on window size
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      Map.size = new Vector2(canvas.clientWidth, canvas.clientHeight);
      ctx.translate(Map.size.x / 2, Map.size.y / 2);
    });

    // Create a map to handle coordinate system
    const mapOptions = {
      size: new Vector2(canvas.clientWidth, canvas.clientHeight),
      tileSize: 20
    };
    Map.initialize(ctx, mapOptions);

    ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2);
    Draw.strokeRect(ctx, Map.xMin, Map.yMin, Map.size.x, Map.size.y, Color.Green);

    // Bind all created datas to a glboal object which traverse the app
    Engine.#datas.canvas = canvas;
    Engine.#datas.canvasContext = ctx;
    Engine.#datas.tick = 0;

    let fpsTimer = new Timer();
    let lastTick = Engine.#datas.tick;
    fpsTimer.executeEach(Time.OneSecond, () => {
      Engine.#datas.fps = Engine.#datas.tick - lastTick;
      lastTick = Engine.#datas.tick;
    });

    let timer2 = new Timer();
    timer2.executeEach(Time.OneSecond, () => {
      console.info(Engine.datas.fps);
    });

    Mouse.initialize();

    // Inidicates that initialization has finished
    this.#observer.$emit("initialized");
    Engine.initialized = true;
  }

  /**
   * @description Internal setup function, permits to do some stuff before or after callback has been called
   * and send a signal to advert setup has finished
   * @param callback A callback sent to be executed once on setup
   */
  #setup(callback: Function): void {
    // Wrap the callback into a promise, so :
    // if the callback have its own promise, we can wait for it to end,
    // else we will wait the callback to end and do some more stuff
    Promise.resolve(callback()).then((datas) => {
      Engine.#datas = { ...Engine.#datas, ...datas };
      this.#observer.$emit("setup-finished");
    });
  }

  /**
   * @description Internal loop function, permits to do some stuff before or after callback has been called
   * and loop thanks to requestAnimationFrame API
   * @param callback A callback sent to be executed on each available frame
   */
  async #loop(callback: Function) {
    let c = new Color();
    c.opacity = 1;

    Engine.datas.canvasContext?.clearRect(
      -window.innerWidth / 2,
      -window.innerHeight / 2,
      window.innerWidth,
      window.innerHeight
    );
    // Engine.datas.canvasContext.fillStyle = "#ffffff";
    // Engine.datas.canvasContext.fillRect(
    //   window.innerWidth / 2,
    //   window.innerHeight / 2,
    //   Engine.datas.canvas?.clientWidth,
    //   Engine.datas.canvas?.clientHeight
    // );

    // Doesn't execute anything if the engine is paused
    if (!this.#paused) {
      Map.update();
      Engine.#updatableObjects.forEach((updatableObject: _Updatable) =>
        updatableObject.update(Engine.datas)
      );

      callback();

      // Execute "update" method on scene which is responsible for excute all update methods on entites
      Scene.update();

      Engine.#datas.tick++;
    }

    Time.update();

    await new Promise((r) => setTimeout(r, 0)); // [FOR DEV] Decrease the loop interval

    // Execute loop indefinilty with "this" context
    window.requestAnimationFrame(this.#loop.bind(this, callback));
  }

  /**
   * @description Setup function to call by developper to setup all what is needed
   * The callback will be call only after internal initalize engine function has finished
   * @param callback The callback which will be passed to internal setup function
   */
  setup(callback: Function) {
    // If engine is already initialized, we call the callback
    if (Engine.initialized) {
      this.#setup(callback);
    }

    // Else we wait to receive the signal that it got initialized
    else {
      this.#observer.$on("initialized", this.#setup.bind(this, callback));
    }
  }

  /**
   * @description Loop function to call by developper to loop and execute code on each available frame
   * The callback will be call only after internal and developer setup function has finished
   * @param callback The callback which will be passed to internal loop function
   */

  loop(callback: Function) {
    // If internal and developer setup function is already finished, we call the callback
    if (this.#setupFinished) {
      this.#loop(callback);
    }

    // Else we wait to receive the signal that it got finished
    else {
      this.#observer.$on("setup-finished", this.#loop.bind(this, callback));
    }
  }

  static addUpdatable(object: _Updatable) {
    Engine.#updatableObjects.push(object);
  }

  static removeUpdatable(object: _Updatable) {
    const foundIndex = Engine.#updatableObjects.findIndex((o) => o === object);
    if (foundIndex !== -1) {
      Engine.#updatableObjects.splice(foundIndex, 1);
    }
  }

  static get datas(): _EngineDatasTransport {
    if (!Engine.initialized) {
      throw "Engine not initialized";
    }

    let datas = {
      canvas: Engine.#datas.canvas,
      canvasContext: Engine.#datas.canvasContext,
      tick: Engine.#datas.tick,
      scene: Engine.#datas.scene,
      map: Engine.#datas.map,
      fps: Engine.#datas.fps,
    };

    return datas;
  }
}

export default Engine;
