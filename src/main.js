const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          <li><a href="/login" id="login-btn" class="text-gray-600">로그인</a></li>
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
            <input id="username" type="text" autocomplete="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" type="password" autocomplete="current-password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" id="login" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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

const ProfilePage = () => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600">홈</a></li>
            <li><a href="/profile" class="text-blue-600">프로필</a></li>
            <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
          </ul>
        </nav>

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
                  value="${state.user.username}"
                  autocomplete="username"
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
                  value="${state.user.email}"
                  autocomplete="email"
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
                >${state.user.bio}</textarea>
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
const state = {
  isLoggedIn: JSON.parse(localStorage.getItem('user')) || false,
  user: JSON.parse(localStorage.getItem('user')) || {
    username: '',
    email: '',
    bio: '',
  },
};
// profile save / update
const saveProfile = user => {
  if (JSON.stringify(state.user) !== JSON.stringify(user)) {
    state.user = { ...state.user, ...user };
    localStorage.setItem('user', JSON.stringify(state.user));

    const { username, email, bio } = state.user;
    document.querySelector('#username').value = username;
    document.querySelector('#email').value = email;
    document.querySelector('#bio').value = bio;

    alert('프로필이 업데이트되었습니다.');
  }
};

const loadProfile = () => {
  const savedData = localStorage.getItem('user');
  if (savedData) {
    state.user = JSON.parse(savedData);
  }
};

const pageEventListeners = () => {
  document.body.removeEventListener('click', handleClick);
  document.body.addEventListener('click', handleClick);

  document.body.removeEventListener('submit', handleSubmit);
  document.body.addEventListener('submit', handleSubmit);
};

const loginSubmitHandle = e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;

  if (username) {
    state.user = { username: 'testuser', email: '', bio: '' };
    localStorage.setItem('user', JSON.stringify(state.user));
    navigation('/profile');
  } else {
    alert('아이디와 비밀번호를 입력해주세요.');
  }
};

const handleClick = e => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    navigation(path);
  }
  if (e.target.id === 'logout') {
    e.preventDefault();
    localStorage.removeItem('user');
    navigation('/login');
  }
};

const handleSubmit = e => {
  e.preventDefault();
  if (e.target.id === 'login-form') {
    loginSubmitHandle(e);
  } else if (e.target.id === 'profile-form') {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const bio = document.querySelector('#bio').value;
    saveProfile({ username, email, bio });
  }
};

const getCurrentPath = () => {
  if (window.location.hash) {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
  // const path = window.location.pathname + window.location.hash;
  // return path.startsWith('/') ? path : `/${path}`;
};

const navigation = path => {
  const validPaths = ['/', '/profile', '/login', '/404'];
  if (!validPaths.includes(path)) {
    path = '/404';
  }

  const currentPath = getCurrentPath();

  if (currentPath === path) {
    return;
  }

  if (window.history.pushState) {
    window.history.pushState({}, '', path);
  } else {
    window.location.hash = `#${path}`;
  }
  // 경로 변경 후 렌더링
  router();
};

// popstate
window.addEventListener('popstate', () => {
  router();
});

// hashchange
window.addEventListener('hashchange', () => {
  router();
});

// router
const router = () => {
  let path = getCurrentPath();
  const validPaths = ['/', '/profile', '/login', '/404'];

  if (!validPaths.includes(path)) {
    path = '/404';
  }

  // 경로별 페이지 렌더링
  let page;
  if (path === '/profile') {
    page = ProfilePage();
  } else if (path === '/login') {
    page = LoginPage();
  } else if (path === '/') {
    page = MainPage();
  } else if (path === '/404') {
    page = ErrorPage();
  }

  // login -> /login = / , !login -> /profile = /login
  if (
    (path === '/login' && localStorage.getItem('user')) ||
    (path === '/profile' && !localStorage.getItem('user'))
  ) {
    const redirectPath = path === '/login' ? '/' : '/login';
    navigation(redirectPath); // 중복 경로 변경 X
    return;
  }

  const root = document.getElementById('root');
  root.innerHTML = page;

  renderNav();
  pageEventListeners();
};

// navigation render
const renderNav = () => {
  const currentPath = getCurrentPath();
  const nav = document.querySelector('nav ul');
  if (!nav) return;

  const login = localStorage.getItem('user');
  nav.innerHTML = `
    <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
    ${
      login
        ? `<li><a href="/profile" class="text-gray-600">프로필</a></li>
    <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>`
        : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
    }
  `;

  const navLinks = nav.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.remove('text-gray-600');
      link.classList.add('text-blue-600', 'font-bold');
    } else {
      link.classList.remove('text-blue-600', 'font-bold');
      link.classList.add('text-gray-600');
    }
  });
};

const main = () => {
  loadProfile();
  renderNav();
  pageEventListeners();

  const initialPath = getCurrentPath();
  router(initialPath);

  // if (!initialPath || initialPath === '/') {
  //   router();
  // } else {
  //   navigation(initialPath)
  // }

  window.addEventListener('hashchange', router);
  window.addEventListener('popstate', router);
};

main();
