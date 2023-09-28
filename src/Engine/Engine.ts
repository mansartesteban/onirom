import Observer from "./Observer";

class Engine {
  app: HTMLElement;
  canvas: HTMLElement | undefined;
  ctx: CanvasRenderingContext2D | undefined;
  observer: Observer;

  constructor(app: HTMLElement) {
    this.app = app;
    this.observer = new Observer(["setup-finished"]);
    this.#initializeEngine();
  }

  #initializeEngine() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw "Unable to get context '2d' from canvas, aborting !";
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = ctx;
    this.app.appendChild(canvas);
  }

  #setup(callback: Function): Promise<any> {
    return Promise.resolve(callback());
  }

  #loop(callback: Function) {
    callback(this.ctx);

    window.requestAnimationFrame(this.#loop.bind(this, callback));
  }

  setup(callback: Function) {
    this.#setup(callback).then(() => {
      this.observer.$emit("setup-finished");
    });
  }

  loop(callback: Function) {
    this.observer.$on("setup-finished", this.#loop.bind(this, callback));
  }
}

export default Engine;
