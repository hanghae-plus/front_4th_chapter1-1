import { Router } from "./shared/router";

import { Error404Page } from "./pages/404";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";

const render = () => {
  Router.addRoute("/", HomePage);
  Router.addRoute("/login", LoginPage);
  Router.addRoute("/profile", ProfilePage);
  Router.addRoute("/404", Error404Page);

  Router.init();
};

render();
