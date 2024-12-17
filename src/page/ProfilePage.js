import Footer from "../components/Footer";
import Header from "../components/Header";
import router from "../router/Router";
import userStore from "../store/userStore";

class ProfilePage {
  constructor() {
    this.store = userStore;
    this.store.addObserver(this);
    this.root = document.querySelector("#root");
  }

  update(state) {
    this.render(state);
  }

  render() {
    if (this.auth()) {
      return;
    }

    const store = this.store.getState();

    console.log(store);

    this.root.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      
        ${Header()}

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
                  value="${store.username}"
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
                  value="${store.email}"
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
                >${store.bio}</textarea>
              </div>
              <button
                id="increment"
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
`;

    this.attachEventListeners();
  }

  auth() {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replaceTo("/login");
      return true;
    }
  }

  attachEventListeners() {
    const logout = document.querySelector("#logout");

    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.clear();
      });
    }

    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: document.querySelector("#username").value,
          email: document.querySelector("#email").value,
          bio: document.querySelector("#bio").value,
        }),
      );

      this.store.setState({
        username: document.querySelector("#username").value,
        email: document.querySelector("#email").value,
        bio: document.querySelector("#bio").value,
      });

      alert("프로필이 업데이트되었습니다.");
    });
  }
}

export default ProfilePage;
