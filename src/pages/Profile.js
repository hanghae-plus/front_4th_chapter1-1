import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { authStorage } from "../utils/authStorage";
import { useNavigate } from "../utils/useNavigate";

const { getLoginInfo, saveLoginInfo } = authStorage();

export const ProfilePage = {
  onMount: () => {
    const { navigate } = useNavigate();
    const currentLoginStatus = getLoginInfo();

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioTextarea = document.getElementById("bio");
    const form = document.getElementById("profile-form");

    if (location.pathname === "/profile" && !currentLoginStatus) {
      if (location.pathname === "/profile" && !currentLoginStatus) {
        navigate("/login");
      }
    }

    if (currentLoginStatus) {
      usernameInput.value = currentLoginStatus?.username || "";
      emailInput.value = currentLoginStatus?.email || "";
      bioTextarea.value = currentLoginStatus?.bio || "";
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        try {
          saveLoginInfo({
            username: usernameInput.value,
            email: emailInput.value,
            bio: bioTextarea.value,
          });

          alert("프로필을 수정했습니다.");
        } catch (err) {
          console.error(err);
          alert("프로필수정을 실패했습니다.");
        }
      });
    }
  },

  render: () => {
    return `
  ${Header()}
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
          내 프로필
        </h2>
        <form id='profile-form'>
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
            ></textarea>
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
  `;
  },
};
