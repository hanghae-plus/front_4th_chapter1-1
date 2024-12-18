const MainPage = (user) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav id="nav-link" aria-label="navigation" class="bg-white shadow-md p-2 sticky top-14">
        <ul id="main-link" class="flex justify-around">
          <li><a id="home-link" href="/" class="text-blue-600 font-bold">홈</a></li>
            ${
              user
                ? `
              
                <li><a id="profile-link" href="/profile" className="text-blue-600">프로필</a></li>
                <li><a id="logout" href="/login" className="text-gray-600">로그아웃</a></li>
            `
                : `
                <li><a id="login-link" href="/login" aria-label="로그인" className="text-gray-600">로그인</a></li>
            `
            }
        </ul>
      </nav>

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>
        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">홍길동</p>
                <p class="text-sm text-gray-500">5분 전</p>
              </div>
            </div>
            <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">김철수</p>
                <p class="text-sm text-gray-500">15분 전</p>
              </div>
            </div>
            <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">이영희</p>
                <p class="text-sm text-gray-500">30분 전</p>
              </div>
            </div>
            <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">박민수</p>
                <p class="text-sm text-gray-500">1시간 전</p>
              </div>
            </div>
            <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">정수연</p>
                <p class="text-sm text-gray-500">2시간 전</p>
              </div>
            </div>
            <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;

const ErrorPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button aria-label="로그인" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
<!--        <a type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</a>-->
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

const ProfilePage = (user) => `
  <div>
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav id="nav-link" aria-label="navigation" class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a id="home-link" href="/" class="text-gray-600 text-blue-600 font-bold">홈</a></li>
            ${
              user
                ? `
              
                <li><a id="profile-link" href="/profile" className="text-blue-600">프로필</a></li>
                <li><a id="logout" href="/login" className="text-gray-600">로그아웃</a></li>
              
            `
                : `
                <li><a id="login-link" aria-label="로그인" href="/login" className="text-gray-600">로그인</a></li>
            `
            }
          </ul>
        </nav>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-2">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  class="w-full p-2 border rounded"
                  value="${user?.username || ""}"
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
                  value="${user?.email || ""}"
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
                >
                    ${user?.bio || ""}
                </textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  </div>
`;

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
    console.log("여기는 반드시", location.hash, routeCallback, currentHash);

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
      console.log("path보기", path);
      location.hash = path;
      // handleRoute(path);
    } else {
      console.log("path", path);
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
      console.log("반드시2", path);

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

console.log("이게 뭐야?", document.querySelector('nav a[href="/login"]'));

// 페이지 이동 이벤트를 담는 함수
function registerEventListeners() {
  document.getElementById("nav-link")?.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("클릭클릭", event.target);
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
        console.log("저장되었습니다");
      }
    });
}
