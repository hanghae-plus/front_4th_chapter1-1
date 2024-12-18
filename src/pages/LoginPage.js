import { getUser, saveUser, removeUser } from "../store";
import { navigate } from "../main";

const LoginPage = () => {
  const user = getUser();

  if (user) {
    navigate("/");
    // navigate함수 이후에도 LoginPage() 함수가 계속 실행중이므로 함수 종료
    return;
  }

  document.getElementById("main").innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
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

  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = "";
    const bio = "";
    saveUser({ username, email, bio });
    navigate("/profile");
  });
};

export default LoginPage;
