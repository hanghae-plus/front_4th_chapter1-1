import { App } from "./App.js";

// TODO: Renderer.onDomContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  App.render();
});

// TODO: Renderer.onPopState
window.onpopstate = () => {
  App.render();
};

// TODO: Renderer.onPushState / Render.onReplaceState
["pushState", "replaceState"].forEach((type) => {
  const originalMethod = window.history[type];
  window.history[type] = function (state, title, url) {
    originalMethod.apply(this, arguments);
    const event = new CustomEvent(type, { detail: { state, title, url } });
    window.dispatchEvent(event);
  };

  window.addEventListener(type, () => {
    App.render();
  });
});

// TODO: Renderer.onATagClick
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const url = event.target.getAttribute("href");
    window.history.pushState({}, "", url);
    App.render();
  });
});
