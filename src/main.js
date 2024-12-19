import Router from "./util/router";

class Main {
  constructor() {
    const $root = document.querySelector("#root");
    const router = new Router($root);

    router.handleRoute(window.location.pathname)
  }
}

new Main();