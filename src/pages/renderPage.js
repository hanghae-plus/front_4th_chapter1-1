import { ErrorPage } from "./ErrorPage";
import { LoginPage } from "./LoginPage";
import { MainPage } from "./MainPage";
import { ProfilePage } from "./ProfilePage";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Auth } from "../auth/auth";

const renderPage = (content) => {
  const root = document.getElementById("root");
  root.innerHTML = content;
};

export const renderErrorPage = () => {
  renderPage(ErrorPage());
};

export const renderLoginPage = () => {
  renderPage(LoginPage());

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;

    console.log("ID/Username:", username);

    if (username) {
      Auth.login(username);
      window.history.pushState(null, "", "/profile");
      renderProfilePage();
    }
  });
};

export const renderMainPage = () => {
  const content = /*html*/ `
        <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                ${Header(Auth.isLoggedIn())}
                <main class="p-4">
                    ${MainPage()}
                </main>
                ${Footer()}
            </div>
        </div>
    `;
  renderPage(content);

  const logoutButton = document.getElementById("logout");
  if (logoutButton)
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      Auth.logout();
    });
};

export const renderProfilePage = () => {
  const user = Auth.getUser();
  const content = /*html*/ `
        <div class="bg-gray-100 min-h-screen flex justify-center">
            <div class="max-w-md w-full">
                ${Header(Auth.isLoggedIn())}
                <main class="p-4">
                    ${ProfilePage(user.username, user.email, user.bio)}
                </main>
                ${Footer()}
            </div>
        </div>
        `;
  renderPage(content);

  const profileForm = document.getElementById("profile-form");
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    if (username) {
      Auth.update(username, email, bio);
      window.history.pushState(null, "", "/profile");
      renderProfilePage();
    }
  });

  const logoutButton = document.getElementById("logout");
  if (logoutButton)
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      Auth.logout();
    });
};
