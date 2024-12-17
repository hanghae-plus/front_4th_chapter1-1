import { userManager } from "../utils/user";

const HREF_TAG_IN_NAVIGATOR_ATTRIBUTE_VALUE_MAP_LIST = [
  {
    href: "/",
    id: "home",
    text: "홈",
  },
];

const SIGNIN_USER_HREF_TAG_ATTRIBUTE_VALUE_MAP_LIST = [
  {
    href: "/profile",
    id: "profile",
    text: "프로필",
  },
  {
    href: "#",
    id: "logout",
    text: "로그아웃",
  },
];

const NON_SIGNIN_USER_HREF_TAG_ATTRIBUTE_VALUE_MAP_LIST = [
  {
    href: "/login",
    id: "login",
    text: "로그인",
  },
];

export const Header =
  () => `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
     `;

export const Navigation = () => {
  const isLogin = userManager.isLogin();

  const aTagDataList = [
    ...HREF_TAG_IN_NAVIGATOR_ATTRIBUTE_VALUE_MAP_LIST,
    ...(isLogin
      ? SIGNIN_USER_HREF_TAG_ATTRIBUTE_VALUE_MAP_LIST
      : NON_SIGNIN_USER_HREF_TAG_ATTRIBUTE_VALUE_MAP_LIST),
  ];

  const path = window.location.pathname;

  const currentPageTabStyleClassName = "text-blue-600 font-bold";
  const defaultPageTabStyleClassName = "text-gray-600";

  return `<nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
    ${aTagDataList
      .map(
        (data) => `<li>
        <a class="${path === data.href ? currentPageTabStyleClassName : defaultPageTabStyleClassName}" href="${data.href}" id="${data.id}">${data.text}</a>
        </li>`,
      )
      .join("")} 
    </ul>
  </nav>`;
};

export const Footer =
  () => `<div id="footerWrapper"><footer class="bg-gray-200 p-4 text-center" id="footerSection">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer></div>`;
