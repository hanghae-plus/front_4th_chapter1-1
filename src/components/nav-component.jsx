import { userStore, userStoreActions } from "@/stores/userStore";
import { navigateTo } from "@/utils/router";

class NavComponent extends HTMLElement {
  constructor() {
    super();
    userStore.subscribe(this.render.bind(this));
  }

  addEvent() {
    const logoutButton = this.querySelector("#logout");

    this.addEventListener("click", (event) => {
      Array.from([...this.querySelectorAll("a")]).forEach((el) => {
        event.preventDefault();
        const url = new URL(el.href);

        if (event.target === logoutButton) {
          this.handleLogout();
          return;
        }

        if (event.target === el) {
          this.handleNavigate(url.pathname);
          return;
        }
      });
    });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    userStore.unsubscribe(this.render.bind(this));
  }

  handleNavigate(path) {
    navigateTo(path, { hash: window.isHash });
  }

  handleLogout() {
    userStoreActions.logout();
    navigateTo("/login", { hash: window.isHash });
  }

  render() {
    const user = userStore.getState();
    const isLogin = user?.username;
    const element = (
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li>
            <a
              href={"/"}
              class={
                window.isHash
                  ? window.location.hash === "#/"
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
                  : window.location.pathname === "/"
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
              }
            >
              홈
            </a>
          </li>
          <li>
            <a
              href="/profile"
              class={
                window.isHash
                  ? window.location.hash === "#/profile"
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
                  : window.location.pathname === "/profile"
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"
              }
            >
              프로필
            </a>
          </li>
          {isLogin ? (
            <li>
              <a href="#" id="logout" class="text-gray-600">
                로그아웃
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" class={"text-gray-600"}>
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

    this.addEvent();
  }
}

customElements.define("nav-component", NavComponent);
