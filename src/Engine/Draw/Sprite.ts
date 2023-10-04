import { _Drawable, _SpriteOptions } from "../..";
import Rotation from "../Maths/Rotation";
import Vector2 from "../Maths/Vector2";

class Sprite implements _Drawable {

    #path: string;
    #columns: number;
    #rows: number;
    #count: number;
    #scale: number;
    #offsetRotation: Rotation;

    #img: HTMLImageElement;
    #imgLoaded: Boolean;

    #current: number;

    constructor(path: string, options: _SpriteOptions = {}) {
        this.#path = path;
        this.#columns = options.columns || 1;
        this.#rows = options.rows || 1;
        this.#count = options.count || 1;
        this.#scale = options.scale || 1;
        this.#offsetRotation = options.offsetRotation || new Rotation();
        this.#current = 0;

        this.#img = new Image();
        this.#imgLoaded = false;

        this.#loadImage();
    }

    #loadImage() {
        this.#img.onload = () => {
            this.#imgLoaded = true;
        };
        this.#img.src = this.#path;
    }

    next(steps: number = 1) {
        this.#current += steps;
        if (this.#current > this.#count - 1) {
            this.#current = 0;
        }
    }

    prev(steps: number = 1) {
        this.#current -= steps;
        if (this.#current > this.#count - 1) {
            this.#current = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D, position: Vector2 = new Vector2(), rotation: Rotation = new Rotation()) {

        if (this.#imgLoaded) {
            let current = new Vector2(this.#current % this.#columns, Math.floor(this.#current / this.#columns));

            let spriteWidth = this.#img.width / this.#columns;
            let spriteHeight = this.#img.height / this.#rows;
            let displayedWidth = spriteWidth * this.#scale;
            let displayedHeight = spriteHeight * this.#scale;

            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(-rotation.sub(this.#offsetRotation).angle);
            ctx.translate(-position.x, -position.y);
            ctx.drawImage(
                this.#img,
                current.x * spriteWidth,
                current.y * spriteHeight,
                spriteWidth,
                spriteHeight,
                position.x - displayedWidth / 2,
                position.y - displayedHeight / 2,
                displayedWidth,
                displayedHeight
            );
            ctx.restore();
        }
    }
}

export default Sprite;