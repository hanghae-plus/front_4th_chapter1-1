import Nav from "../components/nav.js";
import Header from "../components/common/header.js";
import Footer from "../components/common/footer.js";
import UserPreferences from "../utils/userPreference.js";
import Router from "../routes/router.js";

const ProfilePage = () => {
  const router = new Router();
  const prefs = new UserPreferences();
  const username = prefs.get("username");
  const email = prefs.get("email");
  const bio = prefs.get("bio");

  function redirectHome() {
    if (!username) {
      router.navigateTo("/login");
      return true;
    }
    return false;
  }

  const template = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}

      ${Nav()}

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
              >${bio}</textarea
              >
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

      ${Footer()}
    </div>
  </div>
`;

  const render = () => {
    if (redirectHome()) return;
    document.getElementById("root").innerHTML = template;
    setup();
  };

  const setup = () => {
    const form = document.getElementById("profile-form");
    const inputEmail = document.getElementById("email");
    const inputBio = document.getElementById("bio");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      prefs.set("email", inputEmail.value);
      prefs.set("bio", inputBio.value);

      window.alert("프로필이 업데이트되었습니다.");
    });
  };

  return {
    render,
  };
};

export default ProfilePage;
