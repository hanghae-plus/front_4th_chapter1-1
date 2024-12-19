import { MainPage, ErrorPage, ProfilePage, LoginPage } from "./pages/index.js";
import "./routes/router.js";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
