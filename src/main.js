import { initRouteChange, router } from "./utils/router";

const { handleReplace } = router();

initRouteChange();

document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    handleReplace(e);
    const customEvent = new CustomEvent("urlChange", {
      detail: window.location,
    });

    window.dispatchEvent(customEvent);
  }
});
