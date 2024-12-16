import { AuthentificatedNavigation } from "./../navigation/AuthentificatedNativation";
import { UserStore } from "../../store/authStore";
import { UserInfoType } from "../../utils/userPreference";
import { UnauthentificatedNavigation } from "../navigation/UnauthenticatedNavigation";

export class Header {
  private container: HTMLElement;
  authentificatedNavigation: AuthentificatedNavigation;
  unAuthentificatedNavigation: UnauthentificatedNavigation;
  userInfo: UserInfoType | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.userInfo = UserStore.state.userInfo;

    this.authentificatedNavigation = new AuthentificatedNavigation(
      this.container,
    );

    this.unAuthentificatedNavigation = new UnauthentificatedNavigation(
      this.container,
    );

    UserStore.addObserver({
      update: (state) => {
        this.userInfo = state.userInfo;
        this.container.innerHTML = this.render();
      },
    });
  }

  render() {
    return `      
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${this.userInfo ? this.authentificatedNavigation.render() : this.unAuthentificatedNavigation.render()}
      `;
  }
}
