import Vector2 from "./Engine/Maths/Vector2";
import Scene from "@core/Scene";

type _SpriteOptions = {
    columns?: number,
    rows?: number,
    count?: number;
    scale?: number;
    offsetRotation?: Rotation;
};

type _EngineDatasTransport = {
    canvas: HTMLElement,
    canvasContext: CanvasRenderingContext2D,
    scene: Scene,
    tick: number,
    map: Map;
    fps: number;
};
interface _Updatable {
    update(datas?: _EngineDatasTransport);
}

interface _Drawable {
    draw(ctx: CanvasRenderingContext2D);
}

interface _UIComponent {
    render(parent: Element);
}