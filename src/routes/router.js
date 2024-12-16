import render from "../render";
import navigate from "./navigate";

const router = () => {
  render(window.location.pathname);
  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });

  window.addEventListener("click", (event) => {
    if (
      event.target.tagName === "a" &&
      event.target.getAttribute("href").startsWith("/")
    ) {
      event.preventDefault();
      const path = event.target.getAttribute("href");
      navigate(path);
      render(path);
    }
  });
};

export default router;
