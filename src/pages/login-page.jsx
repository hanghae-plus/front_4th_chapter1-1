import { userStore } from "@/stores/userStore";
import { navigateTo } from "@/utils/router";

class LoginPage extends HTMLElement {
  constructor() {
    super();
    userStore.subscribe(this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    userStore.unsubscribe(this.render.bind(this));
  }

  render() {
    const user = userStore.getState();

    if (user.username) {
      navigateTo(window.isHash ? "#/" : "/", { hash: window.isHash });
    }

    const element = (
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
            항해플러스
          </h1>
          <login-form-component></login-form-component>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <hr class="my-6" />
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
              새 계정 만들기
            </button>
          </div>
        </div>
      </main>
    );

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("login-page", LoginPage);
