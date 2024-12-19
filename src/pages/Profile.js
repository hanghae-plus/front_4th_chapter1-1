import Footer from "../components/Footer";
import Header from "../components/Header";
import browserRouter from "../router/browser-router";
import { getUser, removeUser } from "../utils/user";

const ProfilePage = () => {
  const user = JSON.parse(getUser());

  return `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
       ${Header()}
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
                  value="${user.username}"
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
                  value="${user.email}"
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
                ${user.bio}</textarea
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
  </div>
`;
};

export default function renderProfile() {
  const user = getUser();

  if (!user) {
    browserRouter("/login");
    return;
  }
  const root = document.querySelector("#root");
  const targetElement = root ? root : document.body;

  targetElement.innerHTML = `
    ${ProfilePage()}
  `;

  document.body.querySelector(`#gnb`).addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();

      if (e.target.id === "logout") {
        removeUser();
        browserRouter("/login");
        return;
      }

      browserRouter(e.target.pathname);
    }
  });

  document.body
    .querySelector(`#profile-form`)
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const userInfo = JSON.parse(getUser());
      const newUserInfo = {
        ...userInfo,
        username: e.target.elements["username"].value,
        email: e.target.elements["email"].value,
        bio: e.target.elements["bio"].value,
      };

      localStorage.setItem("user", JSON.stringify(newUserInfo));
    });
}
