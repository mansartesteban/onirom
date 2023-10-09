import UI from "@ui/main";

class App {
    static launch(mountOn: string) {
        const app = document.querySelector<HTMLElement>(mountOn);
        if (!app) {
            throw 'Can\'t find dom element named "#app", aborting !';
        }
        UI.setup();
        UI.mount(app);
    }
}

export default App;