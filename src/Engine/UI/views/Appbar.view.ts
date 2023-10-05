import View from "@/Engine/Core/UI/Layout/View";

class AppbarView extends View {
    constructor() {
        super();
        this.toolbar.actions = ["Test", "Hello world !", "Zidane il a marqué !"];
    }
}

export default AppbarView;
