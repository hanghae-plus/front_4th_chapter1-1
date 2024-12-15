import { UserStore } from "@stores";
import { Header, Footer } from "@components/common";

export const ProfilePage = () => {
  const user = UserStore.getValue("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, bio } = e.target.elements;
    const userInfo = {
      username: username.value,
      email: email.value,
      bio: bio.value,
    };
    UserStore.setState({ user: userInfo });
    alert("프로필이 업데이트 되었습니다.");
  };

  const template = `
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
                >${user.bio}</textarea
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

  const render = () => {
    document.getElementById("root").innerHTML = template;
    document
      .getElementById("profile-form")
      .addEventListener("submit", handleSubmit);
  };

  UserStore.subscribe(render);

  return {
    render,
  };
};
