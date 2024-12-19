import userStore from "../store/UserStore.js";
import router from "../router/Router.js";

const Header = () => {
  const LoginState = userStore.LoginState();
  const html = `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/">홈</a></li>
          <li><a href="/profile">프로필</a></li>
          ${
            LoginState
              ? `<li><a href="/login" id="logout">로그아웃</a></li>`
              : `<li><a href="/login">로그인</a></li>`
          }
        </ul>
      </nav>
    `;

  const init = () => {
    const nav = document.querySelector("nav");

    nav.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.innerHTML === "로그아웃") {
        userStore.deleteUser();
      }
      const path = e.target.href.replace(window.location.origin, ""); //상대 경로만 남기기!
      router(path);
    });
  };

  return { html, init };
};

export default Header;
