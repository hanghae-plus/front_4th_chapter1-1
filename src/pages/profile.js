import GlobalNavigation from "../components/gnb";
import {
  GLOBAL_NAVIGATION_ID,
  LOGOUT_BTN_ID,
  PROFILE_UPDATE_FORM_ID,
  usernameInputName,
} from "../constants/html";
import { USER_INFO_LOCALSTORAGE_KEY } from "../constants/user";
import router from "../router/router";

const ProfilePage = () => {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_LOCALSTORAGE_KEY));

  return `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        ${GlobalNavigation()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id=${PROFILE_UPDATE_FORM_ID}>
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
                  value="${userInfo.username}"
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
                  value="${userInfo.email}"
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
                >
${userInfo.bio}</textarea
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

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  </div>
`;
};

export default function renderProfile() {
  const userInfo = localStorage.getItem(USER_INFO_LOCALSTORAGE_KEY);

  if (!userInfo) {
    router("/login");
    return;
  }

  document.body.innerHTML = `
    ${ProfilePage()}
  `;

  document.body
    .querySelector(`#${GLOBAL_NAVIGATION_ID}`)
    .addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        if (e.target.id === LOGOUT_BTN_ID) {
          localStorage.removeItem(USER_INFO_LOCALSTORAGE_KEY);
          router("/login");
          return;
        }

        router(e.target.pathname);
      }
    });

  document.body
    .querySelector(`#${PROFILE_UPDATE_FORM_ID}`)
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const userInfo = JSON.parse(
        localStorage.getItem(USER_INFO_LOCALSTORAGE_KEY),
      );
      const newUserInfo = {
        ...userInfo,
        username: e.target[usernameInputName].value,
        email: e.target["email"].value,
        bio: e.target["bio"].value,
      };

      localStorage.setItem(
        USER_INFO_LOCALSTORAGE_KEY,
        JSON.stringify(newUserInfo),
      );
    });
}
