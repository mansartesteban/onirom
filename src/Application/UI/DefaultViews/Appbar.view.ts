import View from "../View/View";
import ViewComponent from "../Components/View/View";
import ViewHeaderToolbarActions from "../Components/View/ViewHeaderToolbarActions";

class AppbarView extends View {
    setup() {
        if (this.hasComponent()) {
            let component = this.component as ViewComponent;
            let actionComponent = component.slots.header.slots.toolbar.slots
                .actions as ViewHeaderToolbarActions;
            actionComponent.addItems([
                {
                    label: "Libellé de l'action",
                    rounded: true,
                    icon: "add",
                    command: () => {
                        console.info("clicked ! and add");
                        actionComponent.addItems([
                            {
                                label: "Libellé de l'action 2",
                                rounded: true,
                                icon: "arrow-left",
                                command: () => {
                                    console.info("clicked !");
                                },
                            },
                        ]);
                    },
                },
            ]);
            component.render();
        }
    }
}

export default AppbarView;
