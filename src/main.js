import { MainPage } from "./pages/MainPage.js";
import { ProfilePage } from "./pages/ProfilePage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

document.getElementById("root").innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${NotFoundPage()}
`;
