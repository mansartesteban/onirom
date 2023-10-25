export const Hooks = {
    get onCreate() {
        return "onCreate";
    },
    get created() {
        return "created";
    },
    get onMount() {
        return "onMount";
    },
    get mounted() {
        return "mounted";
    },
    get onUpdate() {
        return "onUpdate";
    },
    get updated() {
        return "updated";
    },
    get onRemove() {
        return "onRemove";
    },
    get removed() {
        return "removed";
    },
    get onDestroy() {
        return "onDestroy";
    },
    get destroyed() {
        return "destroyed";
    },
    get deprecated() {
        console.warn("The 'deprecated' lifecycle hook has been deprecated on version 3.2");
        return "deprecated";
    }
};