import { renderChild } from "../utils/element";

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get element() {
    return (
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("header-component", HeaderComponent);
