import { Routes } from "./Routes";
import { getHash, getPathname } from "./utils";

export const App = {
  render: () => {
    const TargetPage = Routes.target(getPathname(), getHash());

    document.querySelector("#root").innerHTML = TargetPage();

    TargetPage.init?.();
  },
};
