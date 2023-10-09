import View from "../Layout/View";
import ViewComponent from "@ui/Components/View/View";


class AppbarView extends View {
    constructor() {
        super("appbar");
        if (this.hasComponent()) {
            (this.component as ViewComponent).header.toolbar.actions.addActions([{
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
