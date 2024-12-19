import MainPage from "./pages/MainPage";

class Main {
  constructor() {
    const $root = document.querySelector("#root");
    new MainPage($root);
  }
}

new Main();