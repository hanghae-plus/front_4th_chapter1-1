import { userStoreActions } from "../stores/userStore";
import { navigateTo } from "../utils/router";

class LoginFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.querySelector("#username").value;

    if (!username) {
      return;
    }

    navigateTo("/");

    const user = {
      username,
      email: "",
      bio: "",
    };

    userStoreActions.login(user);
  }

  render() {
    const element = (
      <form id="login-form" onSubmit={this.handleLogin}>
        <div class="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="이메일 또는 전화번호"
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
  }
}

customElements.define("login-form-component", LoginFormComponent);
