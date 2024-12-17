import router from "../routes/router";

const handleLogin = (data) => {
  const user = {
    username: data.username ?? "",
    email: data.email ?? "",
    bio: data.bio ?? "",
  };

  localStorage.setItem("user", JSON.stringify(user));
  router("/profile");
};
export default handleLogin;
