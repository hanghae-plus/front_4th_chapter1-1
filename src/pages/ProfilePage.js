import { userManager } from "../utils/user";
import { Footer, Header, Navigation } from "../components/Layout";

export const PROFILE_FORM_ID = "profile-form";
export const USER_NAME_INPUT = "username";
export const EMAIL_INPUT = "email";
export const BIO_TEXTAREA = "bio";

export const ProfilePage = () => {
  const { username = "", email = "", bio = "" } = userManager.getData();

  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${Header()}
    ${Navigation()}
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
                  id="${USER_NAME_INPUT}"
                  name="${USER_NAME_INPUT}"
                  value="${username}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label>
                <input
                  type="email"
                  id="${EMAIL_INPUT}"
                  name="${EMAIL_INPUT}"
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
                  id="${BIO_TEXTAREA}"
                  name="${BIO_TEXTAREA}"
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
};
