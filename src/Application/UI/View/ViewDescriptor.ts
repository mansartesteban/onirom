type TViewDescriptorOptions = {
    orientation?: string;
    position?: number,
    hasHeader?: Boolean;
    hasToolbar?: Boolean;
    hasTabs?: Boolean;
    title?: string;
    id: string;
};

const defaultOptions: TViewDescriptorOptions = {
    orientation: "vertical",
    title: "",
    position: 0,
    hasHeader: false,
    hasToolbar: false,
    hasTabs: false,
    id: ""
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