const defaultsAttributes = {
    strokeStyle: "#000",
    lineWidth: "1",
    fillStyle: "#000",
}
const defaultsMethods = {
    setLineDash: []
}

class Draw {

    static draw(ctx: CanvasRenderingContext2D, callback: Function) {
        ctx.beginPath();
        let toReset = callback();
        ctx.closePath();

        if (toReset) {
            Draw.reset(ctx, toReset);
        }
    }

    static reset(ctx: CanvasRenderingContext2D, properties: string[] = []) {

        if (properties.length === 0) {
            properties = Object.keys(defaultsAttributes).concat(Object.keys(defaultsMethods));
        }

        properties.forEach((property: string) => {
            if (Object.keys(defaultsAttributes).indexOf(property) !== -1) {
                ctx[property] = defaultsAttributes[property];
            } else if (Object.keys(defaultsMethods).indexOf(property) !== -1) {
                ctx[property](defaultsMethods[property]);
            }
        });
    }
}
export default Draw;