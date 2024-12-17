import ROUTES from "../routes/routes";
import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const render = (path) => {
  const root = document.getElementById("root");

  const header = path === "/" || path === "/profile" ? Header() : "";
  const footer = path === "/" || path === "/profile" ? Footer() : "";
  const component = ROUTES[path] || NotFoundPage();

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
