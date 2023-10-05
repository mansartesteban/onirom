class Loader {
  load() {
    throw "Classes which extend Loader class must implements 'load' method";
  }
}

export default Loader;
