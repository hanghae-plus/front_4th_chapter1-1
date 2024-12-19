export const setupEventListeners = (navigate) => {
  document.addEventListener("click", (e) => {
    if (e.target.id === "logout") {
      e.preventDefault();
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigate(e.target.getAttribute("href"));
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "profile-form") {
      e.preventDefault();
      const formData = new FormData(e.target);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        username: formData.get("username") || user.username,
        email: formData.get("email") || user.email,
        bio: formData.get("bio") || user.bio,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/profile");
    }

    if (e.target.id === "login-form") {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          email: "",
          bio: "",
        }),
      );
      navigate("/");
    }
  });
};
