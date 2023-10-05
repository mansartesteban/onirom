import Color from "@core/Color";
import Vector2 from "@core/Maths/Vector2";
import Draw from "./Draw";
import { _Drawable } from "@/index";

class Text implements _Drawable {

    #text: string;
    #position: Vector2;
    #color: Color;
    #style: string;

    constructor(text: string = "", position: Vector2 = new Vector2(), color: Color = Color.White, style: string = "10pt sans-serif") {
        this.#text = text;
        this.#position = position;
        this.#color = color;
        this.#style = style;
    }

    get text() {
        return this.#text;
    };
    get position() {
        return this.#position;
    };
    get color() {
        return this.#color;
    };
    get style() {
        return this.#style;
    }

    set text(text: string) {
        this.#text = text;
    }
    set position(position: Vector2) {
        this.#position = position;
    }
    set color(color: Color) {
        this.#color = color;
    }
    set style(style: string) {
        this.#style = style;
    }

    draw(ctx: CanvasRenderingContext2D) {
        Draw.draw(ctx, () => {
            ctx.font = this.style;
            let width = ctx.measureText(this.text).width;
            let heightMatcher = ctx.font.match(/\d+/);
            let height = 0;
            if (heightMatcher) {
                height = parseInt(heightMatcher[0], 10);
            }
            let margin = 5;

            ctx.fillStyle = "#000000";
            ctx.fillRect(this.position.x - margin, this.position.y - height - margin / 2, width + margin * 2, height + margin * 2);

            ctx.fillStyle = this.color._toString;
            ctx.fillText(
                this.text.toString(),
                this.position.x,
                this.position.y
            );

            return ["fillStyle"];
        });
    }
}

export default Text;

/*
TODO:
- Centrer le text sur la position
- Appliquer des styles différents
*/