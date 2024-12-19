const handleProfile = () => {
  if (window.location.pathname === "/profile" && localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    Object.entries(user).forEach(([key, value]) => {
      document.getElementById(key).value = value;
    });
  }
};
export default handleProfile;
