import ROUTES from "../router/routes";

export default function render(pathname) {
  document.body.innerHTML = `
    ${ROUTES[pathname]()}
  `;
}
