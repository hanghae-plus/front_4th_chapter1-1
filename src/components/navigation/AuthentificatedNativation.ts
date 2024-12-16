import { UserStore } from "../../store/authStore";
import { Router, Routes } from "../../utils/router";

export class AuthentificatedNavigation {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this.attachEventListeners();
  }

  render() {
    return `     
     <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" name="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" name="/profile" class="text-gray-600">프로필</a></li>
          <li><a id="logout" href="" name="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>`;
  }

  attachEventListeners() {
    this.container.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();

        if (event.target.id === "logout") {
          UserStore.actions.useLogoutUser();
        }

        const href = extractPath(event.target.href);

        Router.push(href as Routes);
      }

      function extractPath(url: string) {
        const index = url.indexOf("/");
        return index !== -1 ? url.substring(index) : "";
      }
    });
  }
}
