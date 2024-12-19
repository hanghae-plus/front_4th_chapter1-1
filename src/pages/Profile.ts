import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navigator } from "@/components/Navigator";
import { userStore } from "@/store/userStore";

const PROFILE_FORM_ID = "profile-form";

export const ProfilePage = () => {
  const { username, email, bio } = userStore.getUser();

  document.getElementById("root")?.addEventListener("submit", (e) => {
    if (!(e.target instanceof HTMLFormElement)) return;

    if (e.target.id === PROFILE_FORM_ID) {
      const $form = e.target;
      const formData = new FormData($form);

      const email = formData.get("email")?.toString();
      const username = formData.get("username")?.toString();
      const bio = formData.get("bio")?.toString();

      if (!username) {
        alert("유저이름을 입력해주세요");
        return;
      }

      userStore.setUser({
        username,
        email,
        bio,
      });
    }
  });

  return `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navigator({ username })}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="${PROFILE_FORM_ID}">
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
                >
                  ${bio}
                </textarea>
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
