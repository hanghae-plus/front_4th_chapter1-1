import routes from "../routes/routes";
import navigate from "../routes/navigate";
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import isLogin from "../utils/isLogin";

const render = (path) => {
  const root = document.getElementById("root");

  if (path === "/profile") {
    if (!isLogin()) {
      navigate("/login");
      return;
    }
  }

  const header = path === "/" || path === "/profile" ? Header() : "";
  const footer = path === "/" || path === "/profile" ? Footer() : "";
  const component = routes[path] || NotFoundPage();

  root.innerHTML = `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${header}
          ${component}
          ${footer}
        </div>
      </div>
    `;
};
export default render;
