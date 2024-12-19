import ErrorPage from "./component/page/ErropPage.js";
import LoginPage from "./component/page/LoginPage.js";
import MainPage from "./component/page/MainPage.js";
import ProfilePage from "./component/page/ProfilePage.js";

// 함수 선언

function createRouter() {
  const routes = {};

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function getRoutesList() {
    return Object.keys(routes);
  }

  function getRouterPage(path) {
    if (routes[path]) {
      return routes[path]();
    }
    return;
  }

  function handleRouteChange() {
    const currentHash = window.location.hash.slice(1) || "/"; // '#' 제거 후 경로 확인
    const routeCallback = routes[currentHash];
    if (routeCallback) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo && currentHash == "/login") {
        document.getElementById("root").innerHTML = MainPage(userInfo);
      } else {
        document.getElementById("root").innerHTML = routeCallback(); // 해당 콜백 실행
      }
    } else {
      document.getElementById("root").innerHTML = ErrorPage(); // 404 처리
    }
    registerEventListeners(); // 이벤트 리스너 재등록
  }
  // 해시 변경 감지 이벤트 리스너 등록
  window.addEventListener("hashchange", handleRouteChange);

  function navigateTo(path) {
    if (location.hash.includes("#")) {
      location.hash = path;
    } else {
      history.pushState(null, "", path);
      handleRoute(path);
    }
  }

  function handlePopState() {
    handleRoute(window.location.pathname);
  }

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (userInfo && path == "/login") {
        document.getElementById("root").innerHTML = MainPage(userInfo);
      } else {
        document.getElementById("root").innerHTML = handler(); // 적절한 컴포넌트 렌더링
      }
    } else {
      document.getElementById("root").innerHTML = ErrorPage(); // 404 처리
    }
    registerEventListeners(); // 이벤트 리스너 재등록
  }
  window.addEventListener("popstate", handlePopState);
  return {
    addRoute,
    navigateTo,
    getRoutesList,
    getRouterPage,
  };
}

// Router 설정
const router = createRouter();
router.addRoute("/", () => {
  return MainPage(JSON.parse(localStorage.getItem("user")) || "");
});
router.addRoute("/profile", () => {
  if (localStorage.getItem("user")) {
    return ProfilePage(JSON.parse(localStorage.getItem("user")));
  } else {
    return LoginPage();
  }
});
router.addRoute("/login", () => LoginPage());
// 첫 화면
let curPath = window.location.pathname;
if (location.hash.includes("#")) {
  curPath = location.hash.slice(1);
}
if (!router.getRoutesList().includes(curPath)) {
  document.getElementById("root").innerHTML = `
    ${ErrorPage()}
  `;
} else {
  const userInfo = JSON.parse(localStorage.getItem("user")) || {};
  if (userInfo && curPath == "/login") {
    document.getElementById("root").innerHTML = `
    ${router.getRouterPage("/", userInfo)}
  `;
  } else {
    document.getElementById("root").innerHTML = `
    ${router.getRouterPage(curPath, userInfo)}
  `;
    if (curPath === "/profile") {
      document.getElementById("username").value = userInfo?.username || "";
      document.getElementById("email").value = userInfo?.email || "";
      document.getElementById("bio").value = userInfo?.bio || "";
    }
  }
}
registerEventListeners();

// 페이지 이동 이벤트를 담는 함수
function registerEventListeners() {
  document.getElementById("nav-link")?.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.id === "profile-link") {
      router.navigateTo("/profile");
      const userInfo = JSON.parse(localStorage.getItem("user")) || {};
      document.getElementById("username").value = userInfo?.username || "";
      document.getElementById("email").value = userInfo?.email || "";
      document.getElementById("bio").value = userInfo?.bio || "";
    } else if (event.target.id === "home-link") {
      router.navigateTo("/");
    } else if (event.target.id === "logout") {
      localStorage.removeItem("user");
      router.navigateTo("/login");
    } else if (event.target.id === "login-link") {
      localStorage.removeItem("user");
      router.navigateTo("/login");
    }
  });

  // document
  //   .querySelector("#profile-link")
  //   ?.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     router.navigateTo("/profile");
  //     const userInfo = JSON.parse(localStorage.getItem("user")) || {};
  //     document.getElementById("username").value = userInfo?.username || "";
  //     document.getElementById("email").value = userInfo?.email || "";
  //     document.getElementById("bio").value = userInfo?.bio || "";
  //   });
  // document.querySelector("#home-link")?.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   router.navigateTo("/");
  // });
  //
  // document.querySelector("#logout")?.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   localStorage.removeItem("user");
  //   router.navigateTo("/login");
  // });
  //
  // document.querySelector("#login")?.addEventListener("click", (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   localStorage.removeItem("user");
  //   router.navigateTo("/login");
  // });

  // 사용자 로그인
  document.getElementById("login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("username").value;
    // const password = document.getElementById("password").value;
    // if (email && password) {
    const userInfo = JSON.parse(localStorage.getItem("user")) || {};
    userInfo.username = email;
    userInfo.email = "";
    userInfo.bio = "";
    localStorage.setItem("user", JSON.stringify(userInfo));
    router.navigateTo("/profile");
    document.getElementById("username").value = userInfo.username;
    document.getElementById("email").value = userInfo?.email || "";
    document.getElementById("bio").value = userInfo?.bio || "";
    // alert("로그인 정보가 저장되었습니다")
    // } else {
    //   // alert("이메일과 비번을 입력하세요")
    // }
  });

  // 사용자 프로필 저장하기
  document
    .getElementById("profile-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      if (username) {
        const userInfo = JSON.parse(localStorage.getItem("user")) || {};
        userInfo.username = username;
        userInfo.email = email;
        userInfo.bio = bio;
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        alert("프로필이 업데이트 되었습니다");
      }
    });
}
