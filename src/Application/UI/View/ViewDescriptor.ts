type TViewDescriptorOptions = {
    orientation?: "horizontal" | "vertical";
    position?: number,
    hasHeader?: Boolean;
    hasToolbar?: Boolean;
    hasTabs?: Boolean;
    title?: string;
    name: string;
};

const defaultOptions: TViewDescriptorOptions = {
    orientation: "vertical",
    title: "",
    position: 0,
    hasHeader: false,
    hasToolbar: false,
    hasTabs: false,
    name: ""
};

class ViewDescriptor {

    #options: TViewDescriptorOptions;

    constructor(options?: TViewDescriptorOptions) {
        this.#options = { ...defaultOptions, ...options };
    };

    get options() {
        return this.#options;
    }

}

export default ViewDescriptor;