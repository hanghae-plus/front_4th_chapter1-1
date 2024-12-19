import { useNavigate } from "./utils/useNavigate";

const { renderPage, navigate } = useNavigate();

if (location.hash) {
  const path = location.hash.slice(1);
  navigate(path || "/");
} else {
  navigate("/");
}

window.addEventListener("popstate", () => navigate(location.hash.slice(1)));
window.addEventListener("hashchange", () => navigate(location.hash.slice(1)));

renderPage(location.hash.slice(1) || "/");
