import { Router, ROUTES } from "@routers";
import { UserStore } from "@stores";

export const LoginPage = () => {
  const setupLoginHandler = () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        if (!username.value || !password.value) {
          return alert("아이디와 비밀번호를 입력해주세요.");
        }
        const userInfo = {
          username: username.value,
          email: "",
          bio: "",
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        UserStore.setState({ user: userInfo, isLogin: true });
        console.log("이게 뭐야", localStorage.getItem("user"));
        Router.navigate(ROUTES.PROFILE);
      });
    }
  };
  setTimeout(setupLoginHandler, 0);
  return ` <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
  </main>
`;
};
