import { TabNavigator } from "./TabNavigator";

export const Header = () => {
  TabNavigator.onMount();

  return `
    <header id='header' class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    ${TabNavigator.render()}
`;
};
