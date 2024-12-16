import { Layout } from "./components/Layout";
import { initRouteChange, router } from "./utils/router";
import { initStyle } from "./utils/style";
import { initTabs, userManager } from "./utils/user";

const { handleReplace } = router();
export const customEvent = new CustomEvent("urlChange");
export const customLogoutEvent = new CustomEvent("logout");

document.body.querySelector("#root").innerHTML = Layout();

initRouteChange();
initStyle();
initTabs();

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    handleReplace(e);

    window.dispatchEvent(customEvent);
  }
});

window.addEventListener("login", () => {
  history.pushState({}, "", "/profile");
  window.dispatchEvent(customEvent);
});

window.addEventListener("logout", () => {
  userManager.resetUserLocalStorage();
  history.pushState({}, "", "/login");
  window.dispatchEvent(customEvent);
});
