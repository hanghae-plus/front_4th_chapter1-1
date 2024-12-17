import router from "./routes/router";
import handleProfile from "./pages/handleProfile";
import handleChangeProfile from "./pages/handleChangeProfile";
import handleLogin from "./pages/handleLogin";
import hashRouter from "./routes/hashRouter";

window.addEventListener("load", () => {
  if (window.location.hash) {
    hashRouter();
  } else {
    router();
  }
});

window.addEventListener("popstate", () => router());
window.addEventListener("hashchange", () => hashRouter());

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.id === "logout") {
      localStorage.removeItem("user");
      router("/login");
    } else {
      const path = e.target.getAttribute("href");
      console.log("nav click>>", path);
      router(path);
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
