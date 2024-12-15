import { Router } from "./shared/router";

import { Error404Page } from "./pages/404";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";

const render = () => {
  document.getElementById("root").innerHTML = `
  ${Router.pathname === "/" ? HomePage() : ""}
  ${Router.pathname === "/login" ? LoginPage() : ""}
  ${Router.pathname === "/profile" ? ProfilePage() : ""}
  ${Router.pathname === "/404" ? Error404Page() : ""}`;

  Router.init();
};

render();
