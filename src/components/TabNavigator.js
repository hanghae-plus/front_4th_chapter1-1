import { tabList } from "../constant/data";
import { authStorage } from "../utils/authStorage";
import { useNavigate } from "../utils/useNavigate";

export const TabNavigator = {
  onMount: () => {
    const { clearLoginInfo } = authStorage();
    const { navigate } = useNavigate();

    const root = document.getElementById("root");

    root.addEventListener("click", (e) => {
      if (
        e.target.innerText === "로그아웃" &&
        e.target.getAttribute("href") === "/#"
      ) {
        e.preventDefault();
        clearLoginInfo();
        navigate("/");

        TabNavigator.render();

        return;
      }

      const tabNav = document.getElementById("tab-nav");
      if (tabNav && e.target && e.target.nodeName === "LI") {
        const targetPath = e.target.getAttribute("href");

        navigate(targetPath);
        TabNavigator.updateTabStyles();
      }
    });

    TabNavigator.updateTabStyles();
  },

  updateTabStyles: () => {
    document.querySelectorAll("#tab-nav li").forEach((tab) => {
      if (tab.id === location.pathname) {
        tab.classList.add("text-blue-600");
        tab.classList.remove("text-gray-600");
      } else {
        tab.classList.add("text-gray-600");
        tab.classList.remove("text-blue-600");
      }
    });
  },

  render: () => {
    const { getLoginInfo } = authStorage();
    const currentLoginStatus = getLoginInfo();

    const filteredTabs = tabList.filter((tab) => {
      if (tab.id === "login") return !currentLoginStatus;
      if (tab.id === "logout" || tab.id === "profile")
        return currentLoginStatus;
      return true;
    });

    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul id="tab-nav" class="flex justify-around">
          ${filteredTabs
            .map(
              (tab) =>
                `<li id="${tab.id}"><a class="nav ${location.pathname === tab.href ? "text-blue-600" : "text-gray-600"}" href="${tab.href}">${tab.text}</a></li>`,
            )
            .join("")}
        </ul>
      </nav>
    `;
  },
};
