import Engine from "./Engine/Engine";

export const createApp = (mountOn: string = "") => {
  const app = document.querySelector<HTMLElement>(mountOn);
  if (!app) {
    throw 'Can\'t find dom element named "#app", aborting !';
  }

  const engine = new Engine(app);

  engine.setup(async () => {});

  let i = 0;

  engine.loop((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(100 + i, 200 + i, 300 + i * 5, 400 - i * 2);
    i += 1;
    if (i > 100) i = 0;
  });
};
