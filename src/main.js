import { ProfilePage } from "./pages/profile";
import { NotFoundPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { isLoggedIn } from "./utils/local-storage";

// class Router {
//   constructor() {
//       this.routes = {};
//       window.addEventListener('popstate', this.handlePopState.bind(this));
//   }

//   addRoute(path, handler) {
//       this.routes[path] = handler;
//   }

//   navigateTo(path) {
//       history.pushState(null, '', path);
//       this.handleRoute(path);
//       console.log(`current path: ${path}`)
//   }

//   handlePopState() {
//       this.handleRoute(window.location.pathname);
//   }

//   handleRoute(path) {
//       const handler = this.routes[path];
//       if (handler) {
//           handler();
//       } else {
//           console.log('404 Not Found');
//       }
//   }
// }

// export const router = new Router();
// // router.addRoute('/', () => console.log('Home Page'));
// router.addRoute('/', () => HomePage());
// router.addRoute('/login', () => LoginPage());
// router.addRoute('/profile', () => ProfilePage());
// router.addRoute('/404', () => NotFoundPage());
// router.addRoute('/about', () => console.log('About Page'));

// document.querySelector('nav').addEventListener('click', (e) => {
//   if (e.target.tagName === 'A') {
//       e.preventDefault();
//       router.navigateTo(e.target.pathname);
//   }
// });

const routes = {
  "/": HomePage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "/404": NotFoundPage,
};

// return ProfilePage();

const renderPage = () => {
  console.log("renderPage called");
  const path = window.location.pathname;
  // 경로에 맞는 컴포넌트 검색
  const PageComponent = routes[path] || NotFoundPage;
  document.getElementById("root").innerHTML = PageComponent();
};

export const navigate = (path) => {
  // URL 업데이트
  let newPath = ["/", "/profile", "/login", "/#", "/404"].includes(path)
    ? path
    : "/404";

  if (newPath === "/profile" && !isLoggedIn()) {
    newPath = "/login";
  }

  window.history.pushState({}, "", newPath);

  // 새 경로에 맞는 페이지 렌더링
  renderPage();
};

document.addEventListener("click", (event) => {
  //   console.log(`hi`);
  if (event.target.tagName === "A") {
    // 모든 <a> 태그에 대해 처리
    event.preventDefault(); // 기본 동작(페이지 이동) 방지
    navigate(event.target.getAttribute("href")); // 경로 가져오기
  }
});

renderPage();

// 뒤로가기/앞으로가기 이벤트 감지
window.addEventListener("popstate", renderPage);
