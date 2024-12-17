import { ProfilePage } from "./pages/profile-page";
import { NotFoundPage } from "./pages/not-found-page";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";
// import { isLoggedIn } from "./utils/local-storage";

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
    console.log(`current path: ${path}`);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    document.body.innerHTML = HomePage();
    console.log(`handleRoute called, path: ${path}`);
    if (handler) {
      handler();
    } else {
      console.log("404 Not Found");
      this.routes["/404"]();
    }
  }

  render() {
    let currentPath = window.location.pathname;
    const routeList = Object.keys(this.routes);
    if (!routeList.includes(currentPath)) {
      currentPath = "/404";
    }
    //FIXME: not working
    // if (currentPath === '/profile' && !isLoggedIn) {
    //   currentPath = '/login'
    // }
    document.body.innerHTML = this.routes[currentPath];
  }
}

const router = new Router();
router.addRoute("/", HomePage());
router.addRoute("/login", LoginPage());
router.addRoute("/profile", ProfilePage());
router.addRoute("/404", NotFoundPage());

router.render();

// document.getElementById('')
document.getElementById("root").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    console.log("List item ", e.target.id, " was clicked!");
  }
});

// document.querySelector('nav').addEventListener('click', (e) => {
//   if (e.target.tagName === 'A') {
//       e.preventDefault();
//       router.navigateTo(e.target.pathname);
//   }
// });

// event.target: clicked element
// event.target.tagName ?? tag name? : button, li, ...

// const routes = {
//   "/": HomePage,
//   "/profile": ProfilePage,
//   "/login": LoginPage,
//   "/404": NotFoundPage,
// };

// // return ProfilePage();

// const renderPage = () => {
//   console.log("renderPage called");
//   const path = window.location.pathname;
//   // 경로에 맞는 컴포넌트 검색
//   const PageComponent = routes[path] || NotFoundPage;
//   document.getElementById("root").innerHTML = PageComponent();
// };

// export const navigate = (path) => {
//   // URL 업데이트
//   let newPath = ["/", "/profile", "/login", "/#", "/404"].includes(path)
//     ? path
//     : "/404";

//   if (newPath === "/profile" && !isLoggedIn()) {
//     newPath = "/login";
//   }

//   window.history.pushState({}, "", newPath);

//   // 새 경로에 맞는 페이지 렌더링
//   renderPage();
// };

// document.addEventListener("click", (event) => {
//   //   console.log(`hi`);
//   if (event.target.tagName === "A") {
//     // 모든 <a> 태그에 대해 처리
//     event.preventDefault(); // 기본 동작(페이지 이동) 방지
//     navigate(event.target.getAttribute("href")); // 경로 가져오기
//   }
// });

// renderPage();

// // 뒤로가기/앞으로가기 이벤트 감지
// window.addEventListener("popstate", renderPage);
