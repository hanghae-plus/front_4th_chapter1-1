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
          <li><a href="/login" id="loginBtn" class="text-gray-600">로그인</a></li>
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
    <main id="root" class="bg-gray-100 flex items-center justify-center min-h-screen">
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
    <main id="root" class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="loginForm">
          <div class="mb-4">
            <input id="userId" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" id="loginConfirm" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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
            <li><a href="/login" id="logoutBtn" class="text-gray-600">로그아웃</a></li>
          </ul>
        </nav>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profileForm">
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
                  value="${state.userData.username}"
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
                  value="${state.userData.email}"
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
                >${state.userData.bio}</textarea>
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
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  userData: JSON.parse(localStorage.getItem('userData')) || {
    username: 'testuser',
    email: 'a@a.aa',
    bio: '자기소개입니다.',
  },
};

// profile save / update
const saveProfile = userData => {
  if (JSON.stringify(state.userData) !== JSON.stringify(userData)) {
    state.userData = { ...state.userData, ...userData };
    localStorage.setItem('userData', JSON.stringify(state.userData));

    const { username, email, bio } = state.userData;
    document.querySelector('#username').value = username;
    document.querySelector('#email').value = email;
    document.querySelector('#bio').value = bio;

    alert('프로필이 업데이트되었습니다.');
  }
};

const updateLogin = isLoggedIn => {
  state.isLoggedIn = isLoggedIn;
  localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
};

const loadProfile = () => {
  const savedData = localStorage.getItem('userData');
  if (savedData) {
    state.userData = JSON.parse(savedData);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  renderNav();
  pageEventListeners();

  // hash 초기 경로 설정
  const initialPath = window.location.hash.slice(1) || '/';
  navigation(initialPath);

  window.addEventListener('hashchange', router);
});

const pageEventListeners = () => {
  document.body.removeEventListener('click', handleClick);
  document.body.addEventListener('click', handleClick);

  document.body.removeEventListener('submit', handleSubmit);
  document.body.addEventListener('submit', handleSubmit);
};

const loginSubmitHandle = e => {
  e.preventDefault();
  const userId = document.querySelector('#userId').value;
  const password = document.querySelector('#password').value;

  if (userId && password) {
    updateLogin(true);
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
  if (e.target.id === 'logoutBtn') {
    e.preventDefault();
    updateLogin(false);
    navigation('/login');
  }
};
const handleSubmit = e => {
  e.preventDefault();
  if (e.target.id === 'loginForm') {
    loginSubmitHandle(e);
  } else if (e.target.id === 'profileForm') {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const bio = document.querySelector('#bio').value;
    saveProfile({ username, email, bio });
  }
};

const navigation = path => {
  const validPaths = ['/', '/profile', '/login'];
  if (path && !path.startsWith('/')) {
    path = `/${path}`;
  }

  if (validPaths.includes(path)) {
    window.location.hash = `#${path}`;
  } else {
    window.location.hash = '#/404';
  }
};

// router
const router = () => {
  const pathName = window.location.pathname;
  const validPathName = ['/', ''];
  // 잘못된 주소로 접근시 errorpage
  if (!validPathName.includes(pathName)) {
    window.location.replace(`${window.location.origin}/#/404`);
    return;
  }
  // hash 경로 바뀔때 호출
  const path = window.location.hash.slice(1) || '/';
  const validPaths = ['/', '/profile', '/login', '/404'];
  // 경로별 페이지 렌더링
  let page;

  if (validPaths.includes(path)) {
    if (path === '/profile') {
      page = ProfilePage();
    } else if (path === '/login') {
      page = LoginPage();
    } else if (path === '/') {
      page = MainPage();
    } else if (path === '/404') {
      page = ErrorPage();
    }
  } else {
    page = ErrorPage();
    window.location.hash = '/404';
  }

  // login -> /login = / , !login -> /profile = /login
  if (
    (path === '/login' && state.isLoggedIn) ||
    (path === '/profile' && !state.isLoggedIn)
  ) {
    navigation(path === '/login' ? '/' : '/login');
    return;
  }

  document.body.innerHTML = page;

  if (path !== '/login') {
    renderNav();
  }

  pageEventListeners();
};

// navigation render
const renderNav = () => {
  const currentPath = window.location.hash.slice(1) || '/';

  if (currentPath === '/login' || currentPath === '/404') return;

  const nav = document.querySelector('nav ul');
  if (!nav) return;

  const isLoggedIn = state.isLoggedIn;
  nav.innerHTML = `
    <li><a href="/" class="text-blue-600">홈</a></li>
    ${
      isLoggedIn
        ? `<li><a href="/profile" class="text-gray-600">프로필</a></li>
    <li><a href="/login" id="logoutBtn" class="text-gray-600">로그아웃</a></li>`
        : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
    }
  `;

  const navLinks = nav.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.replace('text-gray-600', 'text-blue-600');
    } else {
      link.classList.replace('text-blue-600', 'text-gray-600');
    }
  });
};

router();
