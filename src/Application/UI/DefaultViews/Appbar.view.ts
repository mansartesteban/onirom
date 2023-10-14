import View from "../View/View";
import ViewComponent from "../Components/View/View";
import ViewHeaderToolbarActions from "../Components/View/ViewHeaderToolbarActions";

class AppbarView extends View {
  setup() {
    if (this.hasComponent()) {
      let component = this.component as ViewComponent;
      let actionComponent = component.slots.header.slots.toolbar.slots
        .actions as ViewHeaderToolbarActions;
      actionComponent.addActions([
        {
          label: "Libellé de l'action",
          rounded: true,
          icon: "add",
          command: () => {
            console.info("clicked ! and add");
            actionComponent.addActions([
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
        //     {
        //     label: "Libellé de l'action",
        //     rounded: true,
        //     icon: "add",
        //     severity: "primary",
        //     command: () => {
        //         console.info("clicked !");
        //     }
        // }, {
        //     label: "Libellé de l'action",
        //     rounded: true,
        //     icon: "add",
        //     severity: "success",
        //     command: () => {
        //         console.info("clicked !");
        //     }
        // }, {
        //     label: "Libellé de l'action",
        //     icon: "add",
        //     rounded: true,
        //     severity: "warning",
        //     command: () => {
        //         console.info("clicked !");
        //     }
        // }, {
        //     label: "Libellé de l'action",
        //     rounded: true,
        //     icon: "add",
        //     severity: "error",
        //     command: () => {
        //         console.info("clicked !");
        //     }
        // }, {
        //     label: "Libellé de l'action",
        //     rounded: true,
        //     icon: "add",
        //     severity: "info",
        //     command: () => {
        //         console.info("clicked !");
        //     }
        // }, {
        //     label: "Libellé de l'action",
        //     rounded: true,
        //     icon: "add",
        //     asText: true,
        //     command: () => {
        //         console.info("clicked !");
        //     }
        //     }
      ]);
    }
  }
}

export default AppbarView;
