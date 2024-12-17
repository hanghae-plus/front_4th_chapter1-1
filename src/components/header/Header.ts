import { AuthentificatedNavigation } from "./../navigation/AuthentificatedNativation";
import { UserStore } from "../../store/authStore";
import { UserInfoType } from "../../utils/userPreference";
import { UnauthentificatedNavigation } from "../navigation/UnauthenticatedNavigation";
import { Router, Routes } from "../../utils/router";

export class Header {
  private static instance: Header | null = null;
  private container!: HTMLElement;
  authentificatedNavigation!: AuthentificatedNavigation;
  unAuthentificatedNavigation!: UnauthentificatedNavigation;
  userInfo!: UserInfoType | null;

  constructor(container: HTMLElement) {
    if (Header.instance) {
      return Header.instance;
    }

    this.container = container;

    this.userInfo = UserStore.state.userInfo;
    this.authentificatedNavigation = new AuthentificatedNavigation();
    this.unAuthentificatedNavigation = new UnauthentificatedNavigation();

    this.attachEventListeners();

    UserStore.addObserver({
      update: (state) => {
        this.userInfo = state.userInfo;
        this.container.innerHTML = this.render();
      },
    });

    Header.instance = this;
  }

  render() {
    return `      
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${this.userInfo ? this.authentificatedNavigation.render() : this.unAuthentificatedNavigation.render()}
      `;
  }

  attachEventListeners() {
    this.container.addEventListener("click", this.handleClick);
  }

  private handleClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLAnchorElement) {
      event.preventDefault();

      if (event.target.id === "logout") {
        UserStore.actions.useLogoutUser();
      }

      const href = this.extractPathname(event.target.href);

      Router.push(href as Routes);
    }
  };

  private extractPathname(url: string) {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  }
}
