import { Error } from "../components/ErrorPage";
import { PATHNAME_COMPONENT_MAP } from "./router";

export const generatePage = () => {
  document.body.querySelector("#root").innerHTML =
    PATHNAME_COMPONENT_MAP[window.location.pathname]?.() ?? Error();
};
