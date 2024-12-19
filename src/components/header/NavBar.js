import featureStore from "@/stores/FeatureStore";
import NavTab from "./NavTab";
import userStore from "@/stores/UserStore";

const TAB_ITEMS = {
  main: {
    path: "main",
    label: "홈",
  },
  profile: {
    path: "profile",
    label: "프로필",
  },
  login: {
    path: "login",
    label: "로그인",
  },
  logout: {
    path: "logout",
    label: "로그아웃",
  },
};

const TABS_WITHOUT_USER = [TAB_ITEMS.main, TAB_ITEMS.login];
const TABS_WITH_USER = [TAB_ITEMS.main, TAB_ITEMS.profile, TAB_ITEMS.logout];

const NavBar = () => {
  const user = userStore.getUser();
  const tabItems = user ? TABS_WITH_USER : TABS_WITHOUT_USER;
  const currentFeature = featureStore.getFeature();
  return `
<nav id='root-nav' class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${tabItems
            .map((item) =>
              NavTab({ ...item, active: currentFeature === item.path }),
            )
            .join("")} 
          
        </ul>
      </nav>
      `;
};

export default NavBar;
