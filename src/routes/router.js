import render from "../core/render";
import handleChangeProfile from "../pages/handleChangeProfile";
import handleLogin from "../pages/handleLogin";
import handleProfile from "../pages/handleProfile";
import navigate from "./navigate";

const router = () => {
  render(window.location.pathname);
  window.addEventListener("popstate", () => {
    render(window.location.pathname);
    handleProfile();
  });

  window.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      if (e.target.id === "logout") {
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        const path = e.target.getAttribute("href");
        navigate(path);
        handleProfile();
      }
    }
  });

  window.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (form.id == "login-form") {
      handleLogin(data);
    }
    if (form.id == "profile-form") {
      handleChangeProfile(data);
    }
    handleProfile();
  });

  window.addEventListener("DOMContentLoaded", () => handleProfile());
};

export default router;
