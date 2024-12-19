import { Layout } from "../components/layout";
import { userStore } from "../store/userStore";

export default class ProfilePage {
  constructor(userProfile) {
    this.userProfile = userProfile;
    this.init();
  }

  init() {
    this.userProfile.renderUserData(userStore.user);
    this.updateView();

    userStore.subscribeUser((user) => {
      this.userProfile.renderUserData(user);
      this.updateView();
    });

    this.handleSubmitForm();
  }

  updateView() {
    const root = document.getElementById("root");
    root.innerHTML = this.render();
  }

  render() {
    const { username, email, bio } = userStore.user || {
      username: "",
      email: "",
      bio: "",
    };

    return Layout(`
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
              value="${username}"
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
              value="${email}"
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
            >${bio}</textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    `);
  }

  handleSubmitForm() {
    document.body.addEventListener("submit", (event) => {
      if (event.target?.id === "profile-form") {
        event.preventDefault();
        this.userProfile.updateUserProfile();
        this.updateView();
      }
    });
  }
}
