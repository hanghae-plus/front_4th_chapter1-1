import { getUser, saveUser, removeUser } from "../store";
import { navigate } from "../main";

const ProfilePage = () => {
  const user = getUser();

  if (!user) {
    navigate("/login");
    // navigate함수 이후에도 ProfilePage() 함수가 계속 실행중이므로 함수 종료
    return;
  }

  document.getElementById("main").innerHTML = `
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
            value="${user.username || ""}"
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
            value="${user.email || ""}"
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
          >${user.bio || ""}</textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
`;

  //로그아웃
  const logoutLink = document.getElementById("logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      removeUser();

      navigate("/login");
    });
  }

  //프로필 업데이트
  const profileForm = document.getElementById("profile-form");

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    const updateUser = { ...user, username, email, bio };

    saveUser(updateUser);
  });
};

export default ProfilePage;
