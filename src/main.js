import { MainPage, ErrorPage, ProfilePage, LoginPage } from "./pages/index.js";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
