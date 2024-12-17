import render from "../core/render";
import isLogin from "../utils/isLogin";
import navigate from "./navigate";
import handleProfile from "../pages/handleProfile";

const router = () => {
  const path = window.location.pathname;

  if (path === "/profile") {
    if (!isLogin()) {
      navigate("/login");
      return;
    }
  }

  render(window.location.pathname);
  handleProfile();
};

export default router;
