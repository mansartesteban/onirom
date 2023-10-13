import UI from "@ui/main";

class App {
    static launch(mountOn: string) {
        UI.setup();
        UI.mount(mountOn);
    }
}

export default App;