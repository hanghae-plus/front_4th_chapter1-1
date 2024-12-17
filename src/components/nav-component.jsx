import { userStore, userStoreActions } from "../stores/userStore";
import { navigateTo } from "../utils/router";

class NavComponent extends HTMLElement {
  constructor() {
    super();
    userStore.subscribe(this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  handleNavigate(path) {
    return function (e) {
      e.preventDefault();
      navigateTo(path);
    };
  }

  handleLogout() {
    userStoreActions.logout();
    navigateTo("/");
  }

  render() {
    const user = userStore.getState();
    const isLogin = user?.username;
    const element = (
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a
              href="/"
              class={
                window.location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-600"
              }
              onClick={this.handleNavigate("/")}
            >
              홈
            </a>
          </li>
          <li>
            <a
              href="/profile"
              class={
                window.location.pathname === "/profile"
                  ? "text-blue-600"
                  : "text-gray-600"
              }
              onClick={this.handleNavigate("/profile")}
            >
              프로필
            </a>
          </li>
          {isLogin ? (
            <li>
              <button
                id="logout"
                class="text-gray-600"
                onClick={this.handleLogout}
              >
                로그아웃
              </button>
            </li>
          ) : (
            <li>
              <a
                href="/login"
                class={
                  window.location.pathname === "/login"
                    ? "text-blue-600"
                    : "text-gray-600"
                }
                onClick={this.handleNavigate("/login")}
              >
                로그인
              </a>
            </li>
          )}
        </ul>
      </nav>
    );

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("nav-component", NavComponent);
