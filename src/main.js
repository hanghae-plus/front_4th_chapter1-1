import { router } from "./route.js";
import "./store/index.js";
import { removeUser } from "./store/index.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// 페이지 렌더링 함수
function render(path) {
  const root = document.getElementById("root");
  const page = router[path] || router["/404"];
  if (path === "/" || path === "/profile") {
    root.innerHTML = `<div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main id="main" class="p-4"></main>
        ${Footer()}
      </div>
    </div>`;
    page();

    const logoutLink = document.getElementById("logout");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        removeUser();

        navigate("/login");
      });
    }
  } else {
    root.innerHTML = `<main id="main" class="bg-gray-100 flex items-center justify-center min-h-screen">
    </main>`;
    page();
  }
}

// URL 변경 처리
export function navigate(path) {
  if (path === window.location.pathname) return;
  history.pushState({}, "", path);
  render(path);
}

// 뒤로가기, 앞으로가기 처리
window.addEventListener("popstate", () => render(window.location.pathname));

//초기화
document.addEventListener("DOMContentLoaded", () =>
  render(window.location.pathname),
);

render(window.location.pathname);
