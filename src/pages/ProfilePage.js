import Page from ".";
import Footer from "../components/Footer";
import Header from "../components/Header";
import userStore from "../core/userStore";

class ProfilePage extends Page {
  getUserState() {
    const userInfo = userStore.getUserInfo();

    if (userInfo) {
      document.getElementById("username").value =
        userInfo.username ?? "testuser";
      document.getElementById("email").value = userInfo.email ?? "";
      document.getElementById("bio").value = userInfo.bio ?? "";
    }
  }

  updateUserState() {
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    userStore.setUserState({ username: name, email: email, bio: bio });
  }

  addEventListeners() {
    this.getUserState();

    const $profileForm = document.getElementById("profile-form");
    $profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if ($profileForm.textContent) {
        this.updateUserState();
      }
    });
  }

  getHtml() {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id = "profile-form">
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
                  value=""
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
                  value=""
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
                ></textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >프로필 업데이트</button>
            </form>
          </div>
        </main>
        ${Footer()}
      </div>
    </div>    `;
  }
}
export default ProfilePage;
