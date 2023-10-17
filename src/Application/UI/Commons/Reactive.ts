class Reactive {
    #value: any;

    callbacks: Function[] = [];

    constructor(value: any) {
        this.#value = value;
    };
    get value() {
        return this.#value;
    }
    set value(value: any) {
        this.#value = value;
        this.fire();
    }
    fire() {
        this.callbacks.forEach((callback: Function) => {
            callback(this.value);
        });
    }
    onChange(...callbacks: Function[]) {
        this.callbacks.push(...callbacks);
    }
}

export default Reactive;