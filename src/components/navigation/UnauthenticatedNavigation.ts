import { Router, Routes } from "../../utils/router";

export class UnauthentificatedNavigation {
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
          <li><a id="login" href="/login" name="/login" class="text-gray-600">로그인</a></li>
        </ul>
      </nav>
      `;
  }

  attachEventListeners() {
    this.container.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();

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
