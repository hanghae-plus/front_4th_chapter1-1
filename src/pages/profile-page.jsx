import { userStore } from "@/stores/userStore";
import { navigateTo } from "@/utils/router";

class ProfilePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const user = userStore.getState();

    if (!user?.username) {
      navigateTo("/login", { hash: window.isHash });
      return;
    }

    this.render();
  }

  render() {
    const element = (
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

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("profile-page", ProfilePage);
