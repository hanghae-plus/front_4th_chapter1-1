import navigate from "../routes/navigate";

const handleLogin = (data) => {
  const user = {
    username: data.username ?? "",
    email: data.email ?? "",
    bio: data.bio ?? "",
  };

  localStorage.setItem("user", JSON.stringify(user));
  navigate("/profile");
};
export default handleLogin;
