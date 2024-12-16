import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { UserStore } from "../../store/authStore";
import { UserInfoType } from "../../utils/userPreference";

export class ProfilePage {
  private container: HTMLElement;
  private footer: Footer;
  private header: Header;
  private userInfo: UserInfoType | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.attachEventListeners();

    this.footer = new Footer();
    this.header = new Header(this.container);

    this.userInfo = UserStore.state.userInfo;

    UserStore.addObserver({
      update: (state) => {
        this.userInfo = state.userInfo;
        this.container.innerHTML = this.render();
      },
    });

    if (this.userInfo) {
      this.render();
    }
  }

  render() {
    return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${this.header.render()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value="${this.userInfo?.username ?? ""}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="${this.userInfo?.email ?? ""}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${this.userInfo?.bio ?? ""}</textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>
          ${this.footer.render()}
        </div>
      </div>
    </div>
  `;
  }

  attachEventListeners() {
    this.container.addEventListener("submit", (event) => {
      event.preventDefault();

      if (
        event.target instanceof HTMLFormElement &&
        event.target.id === "profile-form"
      ) {
        const username = event.target.querySelector(
          "#username",
        ) as HTMLInputElement;

        const email = event.target.querySelector("#email") as HTMLInputElement;

        const bio = event.target.querySelector("#bio") as HTMLInputElement;

        UserStore.actions.useSetAllUserInfo({
          username: username.value,
          email: email.value,
          bio: bio.value,
        });
      }
    });
  }
}
