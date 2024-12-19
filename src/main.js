import User from "./lib/auth/User";
import router from "./network/router/Router";
import featureStore from "./stores/FeatureStore";
import userStore from "./stores/UserStore";

const init = () => {
  userStore.setUser(User.getUser());
  document.body.innerHTML = `<div id="root"></div>`;
  featureStore.setFeature(window.location.pathname);
};
init();

window.addEventListener("load", () => {
  // 진입점이 해시 경로인지 아닌지에 따라 어떠한 경로를 라우팅할지 결정
  // 해시로 진입한 경우에는 해시라우터를 쓴다고 toggle 해 주어야 할까?
  window.location.hash
    ? router.route(window.location.hash.replace("#", ""))
    : router.route(window.location.pathname);

  if (window.location.hash) {
    router.toggleHash(true);
  }
});
