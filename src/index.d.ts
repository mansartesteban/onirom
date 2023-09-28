import Scene from "./SimulationAnts/Scene"

interface _EngineDatasTransport {
    canvas?: HTMLElement,
    canvasContext?: CanvasRenderingContext2D,
    scene?: Scene,
    tick?: number
}