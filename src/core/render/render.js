import ROUTES from "../router/routes";

export default function render(pathname) {
  document.getElementById("root").innerHTML = `
    ${ROUTES[pathname]()}
  `;
}
