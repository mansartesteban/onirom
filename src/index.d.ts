import Scene from "./SimulationAnts/Scene"

type _EngineDatasTransport = {
    canvas?: HTMLElement,
    canvasContext?: CanvasRenderingContext2D,
    scene?: Scene,
    tick: number
}