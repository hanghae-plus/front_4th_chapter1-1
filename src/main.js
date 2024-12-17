import { useRouter } from "./utils/router";

const { router } = useRouter();

window.addEventListener("load", () => {
  router();
});
window.addEventListener("popstate", () => {
  router();
});
window.addEventListener("hashchange", () => {
  router();
});
