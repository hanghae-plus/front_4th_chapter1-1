import { createRouter } from "./utils/router";

class MainApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.router = createRouter(this)
      .addRoute("/", <main-page></main-page>)
      .addRoute("/login", <login-page></login-page>)
      .addRoute("/profile", <profile-page></profile-page>)
      .addRoute("*", <error-page></error-page>)
      .init();

    this.render();
  }

  render() {
    const element = this.router.getElement();
    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("main-app", MainApp);
