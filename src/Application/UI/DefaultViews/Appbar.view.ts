import View from "../View/View";
import ViewComponent from "../Components/View/View";


class AppbarView extends View {

    setup() {
        if (this.hasComponent()) {
            (this.component as ViewComponent).slots.header.slots.toolbar.slots.actions.addActions([{
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                severity: "primary",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                severity: "success",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                icon: "add",
                rounded: true,
                severity: "warning",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                severity: "error",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                severity: "info",
                command: () => {
                    console.log("clicked !");
                }
            }, {
                label: "Libellé de l'action",
                rounded: true,
                icon: "add",
                asText: true,
                command: () => {
                    console.log("clicked !");
                }
            }]);
        }
    }
}

export default AppbarView;
