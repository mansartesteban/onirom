import Vector2 from "@GameEngine/lib/Maths/Vector2";
import Scene from "@GameEngine/core/Scene";
import VNode from "./Application/UI/Commons/VNode";

type TSpriteOptions = {
    columns?: number,
    rows?: number,
    count?: number;
    scale?: number;
    offsetRotation?: Rotation;
};

type TEngineDatasTransport = {
    canvas: HTMLElement,
    canvasContext: CanvasRenderingContext2D,
    scene: Scene,
    tick: number,
    map: Map;
    fps: number;
};

type TComponentOptions = {
    props?: { [name: string]: any; };
};

interface IUpdatable {
    update(datas?: TEngineDatasTransport);
}

interface IDrawable {
    draw(ctx: CanvasRenderingContext2D);
}

interface IUIComponent {
    render(parent: Element);
}

interface IRegistry {
    id: string;
    register(...item: any): void;
}

interface ILocalizable {
    getLocation(): VNode;
};