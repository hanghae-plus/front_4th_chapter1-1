import Component from "../core/component";
import { getAuth, getUser, saveUser } from "../auth/auth";
import Router from "../router/router";

class ProfilePage extends Component {
  init() {
    const user = getUser();
    console.log(user);
    this.state = {
      name: user.name || "",
      email: user.email || "",
      introduction: user.introduction || "",
    };
  }

  setEvent() {
    this.addEvent("click", ".nav-link", (e) => {
      const target = e.target.closest("a");
      if (!(target instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      const targetURL = e.target.getAttribute("href");
      const router = Router.instance;
      router.navigate(targetURL);
    });

    this.addEvent("click", ".profile-submit", (e) => {
      e.preventDefault();

      const form = e.target.closest("form");
      const name = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const introduction = form.querySelector("#bio").value;

      saveUser(name, email, introduction);

      this.setState({
        name,
        email,
        introduction,
      });

      alert("프로필이 업데이트 되었습니다");
    });
  }

  template() {
    const currentPath = window.location.pathname;
    const auth = getAuth();

    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

       <nav class="navbar bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="nav-link ${currentPath === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          ${
            auth
              ? `<li><a href="/profile" class="nav-link ${currentPath === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
              <li><a href="/login" class="nav-link logoutBtn text-gray-600">로그아웃</a></li>`
              : `<li><a href="/login" class="nav-link text-gray-600">로그인</a></li>`
          }
        </ul>
      </nav>

      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form>
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
                  value="${this.state.name}"
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
                  value="${this.state.email}"
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
                >${this.state.introduction}</textarea>
              </div>
              <button
                type="submit"
                class="profile-submit w-full bg-blue-600 text-white p-2 rounded font-bold"
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
  `;
  }
}

export default ProfilePage;
