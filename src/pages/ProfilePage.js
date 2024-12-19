import { user } from "../services/user";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LoginPage } from "./LoginPage";

export const ProfilePage = {
  register: ({ router }) => {
    const $profileForm = document.getElementById("profile-form");
    if ($profileForm == null) {
      return;
    }

    $profileForm.addEventListener("submit", () => {
      const usernameInput = $profileForm.querySelector("#username");
      const emailInput = $profileForm.querySelector("#email");
      const bioInput = $profileForm.querySelector("#bio");

      user.updateProfile({
        username: usernameInput.value,
        email: emailInput.value,
        bio: bioInput.value,
      });
    });

    Header.register({ router });
  },

  render: ({ router }) => {
    if (!user.isLogin()) {
      router.push("/login");
      // Note: 새로고침시에도 일시적으로 흰 화면을 보지 않도록 로그인 페이지를 렌더링합니다.
      return LoginPage.render({ router });
    }

    return `
      <div id="root">
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            ${Header.render({ router })}

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
                      value="${user.getProfile().username ?? ""}"
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
                      value="${user.getProfile().email ?? ""}"
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
                    >${user.getProfile().bio ?? ""}</textarea>
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

            ${Footer.render({ router })}
          </div>
        </div>
      </div>
    `;
  },
};
