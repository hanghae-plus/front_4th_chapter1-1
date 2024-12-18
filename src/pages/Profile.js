import Component from "../core/component";
import { getUser, saveUser } from "../auth/auth";
import Router from "../router/router";
import Navbar from "../components/NavBar";

class ProfilePage extends Component {
  init() {
    const user = getUser();
    this.state = {
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
    };
  }

  render() {
    const user = getUser();
    if (!user) {
      const router = new Router();
      router.navigate("/login");
      return;
    }
    super.render();
  }

  isMainPage() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // 현재 경로가 "/"이고 해시가 없거나 "#"인 경우
    if (currentPath === "/" || currentHash === "#/") {
      return true;
    }

    return false;
  }

  setEvent() {
    this.addEvent("submit", "#profile-form", (e) => {
      e.preventDefault();

      const form = e.target.closest("form");
      const username = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const bio = form.querySelector("#bio").value;

      saveUser(username, email, bio);

      this.setState({
        username,
        email,
        bio,
      });

      alert("프로필이 업데이트 되었습니다");
    });
  }

  template() {
    const navbar = new Navbar(this.$target);
    return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
        ${navbar.template()}
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
                    value="${this.state.username}"
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
                  >${this.state.bio}</textarea>
                </div>
                <button
                  type="submit"
                  id="profile-submit"
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
  }
}

export default ProfilePage;
