import App from "./App";

const render = () => (document.querySelector("#root").innerHTML = App());

window.addEventListener("popstate", () => {
  render();
});

render();
