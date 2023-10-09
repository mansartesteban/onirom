import { IRegistry } from "@/index";

class Registry {
    static registries: IRegistry[] = [];

    static add(registry: IRegistry) {
        Registry.registries.push(registry);
    }

    static get(id: string = "") {
        return Registry.registries.find((registry: IRegistry) => registry.id === id);
    }

    static remove(registry: IRegistry) {
        const foundIndex = Registry.registries.findIndex((selfRegistry: IRegistry) => selfRegistry === registry);
        if (foundIndex !== -1) {
            Registry.registries.splice(foundIndex, 1);
        }
    };
}

export default Registry;