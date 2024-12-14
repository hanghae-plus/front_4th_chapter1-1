import { App } from "./App.js";
import { Renderer } from "./Renderer";

document.addEventListener("DOMContentLoaded", () => {
  App.render();
});

Renderer.onPopState(() => App.render());
Renderer.onPushState(() => App.render());
Renderer.onReplaceState(() => App.render());
Renderer.onHashChange(() => App.render());
Renderer.onATagClick(() => App.render());
