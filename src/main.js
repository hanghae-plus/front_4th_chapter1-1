// 초기 페이지 렌더링
localStorage.setItem("isLogin", false);

const Header = () => {
  const NavObject = {
    isLogin: {
      true: [
        {
          url: "/",
          str: "홈",
        },
        {
          url: "/profile",
          str: "프로필",
        },
        {
          url: "/logout",
          str: "로그아웃",
        },
      ],
      false: [
        {
          url: "/",
          str: "홈",
        },
        {
          url: "/login",
          str: "로그인",
        },
      ],
    },
  };

  const isLogin = localStorage.getItem("isLogin");
  const data = NavObject["isLogin"][`${isLogin}`];

  const NavLi = data
    .map((item) => {
      const isActive = window.location.pathname === item.url;
      return `<li><a href="${item.url}" class="${isActive ? "text-blue-600" : "text-gray-600"}" ${item.url === "/logout" ? 'id="logout"' : ""}>${item.str}</a></li>`;
    })
    .join("");

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
       <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NavLi}
      </ul>
    </nav>`;
};

const Footer = () => {
  return `
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>`;
};

const ServicePage = (targetPage) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${targetPage()}
      ${Footer()}
    </div>
  </div>
`;

// 메인페이지 컴포넌트
const MainPage = () => `
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
`;

// 프로필 컴포넌트
const ProfilePage = () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const user = JSON.parse(localStorage.getItem("user"));
  if (isLogin) {
    return `
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value="${user.username.length === 0 ? "" : user.username}"
                  placeholder="사용자 이름을 입력해주세요"
                  class="w-full p-2 border rounded"
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
                  value="${user.email.length === 0 ? "" : user.email}"
                  placeholder="이메일을 입력해주세요"
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
                  placeholder="자기소개를 입력해주세요"
                >${user.bio.length === 0 ? "" : user.bio}</textarea
                >
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold">
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
    `;
  }
};

// 로그인 컴포넌트
const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form" action=''>
        <div class="mb-4">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
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
  </main>
`;

// 에러메세지 컴포넌트
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

const initEventLoginPage = () => {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", function (event) {
    // 폼 제출 기본 동작 막기 (페이지 새로고침 방지)
    event.preventDefault();

    const username = loginForm.querySelector("input#username").value;

    localStorage.setItem("isLogin", true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        email: "",
        bio: "",
      }),
    );
    navigateTo("/");
  });
};

const initEventProfilePage = () => {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  if (isLogin) {
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", function (event) {
      // 폼 제출 기본 동작 막기 (페이지 새로고침 방지)
      event.preventDefault();

      const username = profileForm.querySelector("input#username").value;
      const email = profileForm.querySelector("input#email").value;
      const bio = profileForm.querySelector("textarea#bio").value;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: username,
          email: email,
          bio: bio,
        }),
      );
    });
  }
};

const logout = () => {
  localStorage.setItem("isLogin", false);
  localStorage.removeItem("user");
  navigateTo("/");
};

// location path : component()
const locationObj = {
  "/": {
    template: () => ServicePage(MainPage),
    renderAfter: () => {},
    requiresAuth: false,
  },
  "/profile": {
    template: () => ServicePage(ProfilePage),
    renderAfter: initEventProfilePage,
    requiresAuth: true,
  },
  "/login": {
    template: LoginPage,
    renderAfter: initEventLoginPage,
    requiresAuth: false,
  },
  "/logout": {
    template: () => {},
    renderAfter: logout,
    requiresAuth: true,
  },
};

// path를 인자로 받아 component 렌더링
const renderPage = (path) => {
  const $root = document.getElementById("root");
  if (locationObj[path]) {
    const requiresAuth = locationObj[path]["requiresAuth"];
    const isLogin = localStorage.getItem("isLogin");
    if (requiresAuth && isLogin === "false") {
      path = "/login";
    }
    $root.innerHTML = locationObj[path]["template"]();
    locationObj[path]["renderAfter"]();
  } else {
    $root.innerHTML = `${ErrorPage()}`;
  }
};

document.body.addEventListener("click", (e) => {
  if (e.target && e.target.tagName === "A") {
    e.preventDefault(); // 새로고침 막기
    navigateTo(e.target.getAttribute("href")); // href 속성에서 경로 가져와서 navigateTo 호출
  }
});

// pushState로 기록하고 render page
function navigateTo(url) {
  history.pushState(null, "", url);
  renderPage(url);
}

// popstate 이벤트: 뒤로가거나 앞으로 갔을 때 페이지 렌더링
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  renderPage(path);
});

renderPage(window.location.pathname);
