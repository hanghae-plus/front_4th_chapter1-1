import { userStoreActions } from "@/stores/userStore";
import { navigateTo } from "@/utils/router";

class LoginFormComponent extends HTMLElement {
  constructor() {
    super();
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

    userStoreActions.login(user);
  }

  render() {
    const element = (
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

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
    this.addEvent();
  }
}

customElements.define("login-form-component", LoginFormComponent);
