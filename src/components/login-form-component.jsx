import { authStoreActions } from "@/stores/auth-store";
import { navigateTo } from "@/utils/router";
import { renderChild } from "../utils/element";

class LoginFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  handleLogin() {
    const username = this.querySelector("#username").value;

    if (!username) {
      return;
    }

    navigateTo("/", { hash: window.isHash });

    const user = {
      username,
      email: "",
      bio: "",
    };

    authStoreActions.login(user);
  }

  get element() {
    return (
      <form id="login-form">
        <div class="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="사용자 이름"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            class="w-full p-2 border rounded"
          />
        </div>
        <button
          role="button"
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          로그인
        </button>
      </form>
    );
  }

  addEvent() {
    const loginForm = this.querySelector("#login-form");

    this.addEventListener("submit", (event) => {
      event.preventDefault();

      if (event.target === loginForm) {
        this.handleLogin();
      }
    });
  }

  render() {
    renderChild(this);
    this.addEvent();
  }
}

customElements.define("login-form-component", LoginFormComponent);
