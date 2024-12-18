import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";

export const ProfilePage = () => {
  const userInfo = localStorage.getItem("user");

  if (!userInfo) return;
  const { username, email, bio } = JSON.parse(userInfo);

  return `
  <div id="profile">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">

      ${Header()}
      ${Navigation()}

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
                  value="${bio}"
                >
${bio}</textarea
                >
              </div>
             
              ${Button("프로필 업데이트", "submit")}
            </form>
          </div>
        </main>

        ${Footer()}
       
      </div>
    </div>
  </div>
`;
};

export const handleProfileSubmit = () => {
  const profileBtn = document.querySelector("#profile-form");

  profileBtn.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const bio = document.querySelector("#bio").value;

    console.log("프로필 서브밋", username, email, bio);

    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        email: email,
        bio: bio,
      }),
    );

    alert("프로필이 업데이트 되었습니다.");
  });
};
