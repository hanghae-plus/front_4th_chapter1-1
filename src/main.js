import router from "./routes/router";
import handleProfile from "./pages/handleProfile";
import handleChangeProfile from "./pages/handleChangeProfile";
import handleLogin from "./pages/handleLogin";
import navigate from "./routes/navigate";

window.addEventListener("load", () => router());
window.addEventListener("popstate", router);

document.addEventListener("click", (e) => {
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

document.addEventListener("submit", (e) => {
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
