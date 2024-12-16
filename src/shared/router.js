import { render } from "../main";

export const router = {
  push: (path) => {
    history.pushState({}, "", path);
    render();
  },
  replace: (path) => {
    history.replaceState({}, "", path);
    render();
  },
};
