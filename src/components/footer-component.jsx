import { renderChild } from "../utils/element";

class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get element() {
    return (
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("footer-component", FooterComponent);
