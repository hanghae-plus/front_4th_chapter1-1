import router, { STATIC_PAGES } from "@/network/router/Router";
import User from "./User";
import { log } from "@/util/common/log";
import userStore from "@/stores/UserStore";
import featureStore from "@/stores/FeatureStore";

const onLoginSubmit = () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault(); //form의 기본 제출 동작 제거
    const formData = new FormData(e.target);
    const user = {
      username: formData.get("username"),
      email: "",
      bio: "",
    };

    // required 속성으로 유효성 검사를 했지만, 다시 한 번 검사(html 조작을 통해 required 제거 가능)
    if (!User.validateUserLogin(user)) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    userStore.setUser(user);
    featureStore.setFeature("main");
    router.navigate(STATIC_PAGES.main.path);
  });
};

const onLogoutSubmit = () => {
  document.querySelector("nav")?.addEventListener("click", (e) => {
    if (e.target.dataset.path !== "logout") return;
    userStore.clearUser();
    log(STATIC_PAGES.login.path);
    router.navigate(STATIC_PAGES.login.path);
  });
};

export { onLoginSubmit, onLogoutSubmit };
