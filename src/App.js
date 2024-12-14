import { Routes } from "./Routes";
import { getPathname } from "./utils/getPathname";

export const App = {
  render: () => {
    const TargetPage = Routes.target(getPathname());

    document.querySelector("#root").innerHTML = TargetPage();

    TargetPage.init?.();
  },
};
