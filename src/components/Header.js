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
          <li><a href="/" class="nav-link">홈</a></li>
          <li><a href="/profile" class="nav-link">프로필</a></li>
          ${
            LoginState
              ? `<li><a href="/login" id="logout" class="nav-link">로그아웃</a></li>`
              : `<li><a href="/login" class="nav-link">로그인</a></li>`
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
      const path = e.target.href.replace(window.location.origin, ""); //상대 경로만 남기기
      router(path);

      setTimeout(() => setActiveLink(path), 100); // 경로 갱신 후 활성화
    });
    setActiveLink(window.location.pathname);
  };

  const setActiveLink = (path) => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === path) {
        link.classList.add("text-blue-600", "font-bold"); // 파란색과 굵은 글씨 스타일
      } else {
        link.classList.remove("text-blue-600", "font-bold");
      }
    });
  };

  return { html, init };
};

export default Header;
