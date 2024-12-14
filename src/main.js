import { Layout } from "./components/Layout";
import { initAuth } from "./utils/auth";
import { initRouteChange, router } from "./utils/router";
import { initStyle } from "./utils/style";

const { handleReplace } = router();
export const customEvent = new CustomEvent("urlChange");

document.body.querySelector("#root").innerHTML = Layout();

initRouteChange();
initAuth();
initStyle();

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    handleReplace(e);

    window.dispatchEvent(customEvent);
  }
});
