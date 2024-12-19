/* export class Router {
    constructor(routes) {
        this.routes = routes;
        this.initializeRouter();
    }

    initializeRouter() {
        // 초기 진입 시 홈으로 리다이렉트
        const validPaths = Object.keys(this.routes);
        if (!validPaths.includes(window.location.pathname)) {
            this.navigate('/');
        }

        // 브라우저 뒤로가기/앞으로가기 처리
        window.addEventListener('popstate', () => this.render());

        // 모든 링크 클릭 이벤트 처리
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a'); // 유연한 선택
            if (anchor && anchor.getAttribute('href')) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href !== '#') {
                    this.navigate(href);
                }
            }
        });

        this.render();
    }

    navigate(path) {
        if (!path || path === window.location.pathname) return; // 동일 경로 이동 방지
        window.history.pushState({}, '', path);
        this.render();
    }

    render() {
        const path = window.location.pathname;
        const component = this.routes[path] || this.routes['404'];

        // 메인 콘텐츠 렌더링
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.innerHTML = component();
        }

        this.addEventListeners();
    }

    addEventListeners() {
        // 로그아웃 버튼 이벤트
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('user');
                this.navigate('/');
            });
        }

        // 로그인 폼 제출 이벤트
        const loginForm = document.querySelector('form');
        if (loginForm && window.location.pathname === '/login') {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.querySelector('input[type="text"]').value.trim();
                if (username) {
                    localStorage.setItem('user', JSON.stringify({ username }));
                    this.navigate('/profile');
                }
            });
        }
    }
}
 */

import { ProfilePage } from "../pages/ProfilePage"; // ProfilePage를 import
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.initializeRouter();
  }

  initializeRouter() {
    // 초기 진입 시 홈으로 리다이렉트
    const validPaths = Object.keys(this.routes);
    if (!validPaths.includes(window.location.pathname)) {
      this.navigate("/");
    }

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener("popstate", () => this.render());

    // 모든 링크 클릭 이벤트 처리
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a"); // 유연한 선택
      if (anchor && anchor.getAttribute("href")) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href !== "#") {
          this.navigate(href);
        }
      }
    });

    this.render();
  }

  /* navigate(path) {
        if (!path || path === window.location.pathname) return; // 동일 경로 이동 방지
        window.history.pushState({}, '', path);  // history API를 이용해 URL 변경
        this.render();  // 변경된 URL에 맞게 렌더링
    } */

  navigate(path) {
    if (!path || path === window.location.pathname) return; // 동일 경로 이동 방지
    window.history.pushState({}, "", path);
    this.render(); // 경로 변경 후 render 호출
  }

  render() {
    const path = window.location.pathname;
    const component = this.routes[path] || this.routes["404"];

    // 메인 콘텐츠 렌더링
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = component();
    }

    this.addEventListeners();
  }

  addEventListeners() {
    // 로그아웃 버튼 이벤트
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user"); // 로컬스토리지에서 사용자 정보 제거
        this.navigate("/login"); // 로그인 페이지로 리다이렉트
      });
    }

    // 로그인 폼 제출 이벤트
    /* const loginForm = document.querySelector('form');
        if (loginForm && window.location.pathname === '/login') {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.querySelector('input[type="text"]').value.trim();
                if (username) {
                    localStorage.setItem('user', JSON.stringify({ username }));
                    this.navigate('/profile');  // 로그인 후 프로필 페이지로 리다이렉트
                }
            });
        } */

    // 로그인 폼 제출 이벤트
    const loginForm = document.querySelector("form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document
          .querySelector('input[type="text"]')
          .value.trim();
        if (username) {
          // 사용자 이름을 로컬스토리지에 저장
          localStorage.setItem("user", JSON.stringify({ username }));

          // 프로필 페이지로 이동 (History API 사용)
          window.history.pushState({}, "", "/profile");
          ProfilePage();
        }
      });
    }
  }
}
