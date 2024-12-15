import { Error404Page } from "./pages/404";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { ProfilePage } from "./pages/profile";

document.body.innerHTML = `
  ${HomePage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${Error404Page()}
`;
