import { render } from "../main";

const login = () => {
  const loginForm = document.querySelector("form");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username) {
        return;
      }
      const information = {
        username: username,
        password: password,
        email: "",
        bio: "",
      };
      window.localStorage.setItem("user", JSON.stringify(information));
      window.history.pushState({}, "", "/");
      render("/");
    });
  }
};

export default login;
