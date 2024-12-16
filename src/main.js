import { Routes } from "./app/routes";
import { BASE_URL } from "./shared/const";
import { router } from "./shared/router";

export const render = () => {
  console.log("rendered!✨✨");
  const currentPath = window.location.pathname;
  const page = Routes[currentPath];
  document.querySelector("#root").innerHTML = page?.() ?? Routes[404]();
};

const initClickListener = () => {
  const root = document.querySelector("#root");

  root.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      const { href } = e.target;
      if (!href) return;

      const path = href.replace(BASE_URL, "");
      router.push(path);
    },
    true,
  );
};

const initPopListener = () => {
  window.addEventListener("popstate", () => {
    const currentPath = window.location.pathname;
    router.replace(currentPath);
  });
};

render();
initPopListener();
initClickListener();
