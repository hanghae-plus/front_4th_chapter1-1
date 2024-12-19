import { useNavigate } from "./utils/useNavigate";

const { renderPage } = useNavigate();

window.addEventListener("popstate", () => renderPage(location.pathname));
renderPage(location.pathname || "/");
