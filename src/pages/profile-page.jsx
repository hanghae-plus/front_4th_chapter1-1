import { renderChild } from "../utils/element";

class ProfilePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get element() {
    return (
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header-component></header-component>
          <nav-component></nav-component>
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <profile-form-component></profile-form-component>
            </div>
          </main>
          <footer-component></footer-component>
        </div>
      </div>
    );
  }

  render() {
    renderChild(this);
  }
}

customElements.define("profile-page", ProfilePage);
