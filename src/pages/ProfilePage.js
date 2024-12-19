import Footer from "../components/Footer";
import Header from "../components/Header";
import Component from "../core/Component";
import Router from "../util/router";
import { $target } from "../util/dom";

export default class ProfilePage extends Component {
    mounted() {
        this.router = new Router();

        const $header = $target(this.$target, '[data-component="header"]');
        const $footer = $target(this.$target, '[data-component="footer"]');

        new Header($header, {
            routes: this.router.getRoutes(),
            router: this.router
        });
        new Footer($footer);
    }
    
    setup() {
        let user = JSON.parse(localStorage.user);
        this.state = {
            username: user?.username || "",
            email: user?.email || "",     
            bio: user?.bio || ""
        };
    }

    setEvent() {
        const profileForm = document.querySelector("#profile-form")
        profileForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const usernameInput = document.querySelector("#username").value.trim();
            const emailInput = document.querySelector("#email").value.trim();
            const bioInput = document.querySelector("#bio").value.trim();

            localStorage.setItem(
                "user",
                JSON.stringify({ username: usernameInput, email: emailInput, bio: bioInput })
            );

            alert("프로필이 업데이트되었습니다.")
        });
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };

        this.render();

        this.setState({
            username: usernameInput,
            email: emailInput,
            bio: bioInput
        });
    }

    template() {
        const { username, email, bio } = this.state;

        return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
                <div class="max-w-md w-full">
                    <header data-component="header"></header>

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
                                    value="${username}"
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
                                    value="${email}"
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
                                    >${bio}</textarea
                                    >
                                </div>
                                <button
                                    id="submitBtn"
                                    type="submit"
                                    class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                                >
                                    프로필 업데이트
                                </button>
                            </form>
                        </div>
                    </main>

                    <footer class="bg-gray-200 p-4 text-center" data-component="footer"></footer>
                </div>
            </div>
        `
    }
}