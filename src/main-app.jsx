import { authGuardMiddleware, guestGuardMiddleware } from "./stores/auth-store";
import { renderChild } from "./utils/element";
import { createHashRouter, createRouter } from "./utils/router";

class MainApp extends HTMLElement {
  #router;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#router = (window.isHash ? createHashRouter(this) : createRouter(this))
      .addRoute("/", () => <main-page></main-page>)
      .addRoute("/login", () => <login-page></login-page>, [
        guestGuardMiddleware,
      ])
      .addRoute("/profile", () => <profile-page></profile-page>, [
        authGuardMiddleware,
      ])
      .addRoute("*", () => <error-page></error-page>)
      .init();

    this.render();
  }

  get element() {
    return this.#router.getElement();
  }

  render() {
    renderChild(this);
  }
}

customElements.define("main-app", MainApp);
