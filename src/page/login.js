import Router from "../router/router";

const LoginPage = () => {
  const template = `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="password" type="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

  const handleEvent = (event) => {
    const target = event.target;
    if (target.id === "login-form") {
      event.preventDefault();
      const formData = new FormData(target);
      const { username } = Object.fromEntries(formData);
      const router = new Router();
      if (username) {
        const user = {
          username,
          email: "",
          bio: "",
        };
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/");
      }
    }
  };

  return { template, handleEvent };
};

export default LoginPage;
