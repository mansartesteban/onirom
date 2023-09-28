import { _EngineDatasTransport } from "..";
import Observer from "./Observer";

// enum events {
//   setupFinished,
//   initializeFinished
// }

class Engine {

  app: HTMLElement;
  observer: Observer;
  initializeFinished: Boolean = false;
  setupFinished: Boolean = false;

  datas: _EngineDatasTransport = {
    tick: 0
  };

  constructor(app: HTMLElement) {
    this.app = app;
    this.observer = new Observer(["setup-finished", "initialized"]);
    this.#initializeEngine();

  }

  /**
   * @description Internal initialize function to create canvas or define settings
   * Emits an event when it has finished
   */
  #initializeEngine() {
    const canvas = document.createElement("canvas");
    this.app.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw "Unable to get context '2d' from canvas, aborting !";
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    this.datas.canvas = canvas;
    this.datas.canvasContext = ctx;

    this.observer.$emit("initialized");
    this.initializeFinished = true;
  }

  /** 
   * @description Internal setup function, permits to do some stuff before or after callback has been called
   * and send a signal to advert setup has finished
   * @param callback A callback sent to be executed once on setup
   */
  #setup(callback: Function): void {
    Promise.resolve(callback(this.datas)).then((datas) => {
      this.datas = { ...this.datas, ...datas }
      this.observer.$emit("setup-finished");
    });;
  }

  /**
   * @description Internal loop function, permits to do some stuff before or after callback has been called
   * and loop thanks to requestAnimationFrame API
   * @param callback A callback sent to be executed on each available frame
   */
  async #loop(callback: Function) {
    callback(this.datas);

    if (this.datas.scene) {
      this.datas.scene.update(this.datas)
    }

    if (this.datas.tick != undefined) {
      this.datas.tick++;
    }

    await new Promise(r => setTimeout(r, 1))
    window.requestAnimationFrame(this.#loop.bind(this, callback));
  }

  /**
   * @description Setup function to call by developper to setup all what is needed
   * The callback will be call only after internal initalize engine function has finished
   * @param callback The callback which will be passed to internal setup function
   */
  setup(callback: Function) {

    // If engine is already initialized, we call the callback
    if (this.initializeFinished) {
      this.#setup(callback)
    }

    // Else we wait to receive the signal that it got initialized
    else {
      this.observer.$on("initialized", this.#setup.bind(this, callback));
    }
  }

  /**
   * @description Loop function to call by developper to loop and execute code on each available frame
   * The callback will be call only after internal and developer setup function has finished
   * @param callback The callback which will be passed to internal loop function
   */

  loop(callback: Function) {

    // If internal and developer setup function is already finished, we call the callback
    if (this.setupFinished) {
      this.#loop(callback);
    }

    // Else we wait to receive the signal that it got finished
    else {
      this.observer.$on("setup-finished", this.#loop.bind(this, callback));
    }
  }
}

export default Engine;
