import { Error } from "../components/ErrorPage";
import { Footer, Header, Navigation } from "../components/Layout";
import { userName } from "./auth";
import { PATHNAME_COMPONENT_MAP } from "./router";

export const generatePage = () => {
  const pathname = window.location.pathname;
  let page = PATHNAME_COMPONENT_MAP[pathname];

  console.log("pathname => ", pathname);

  if (page !== undefined) {
    if (pathname === "/profile" && !userName) {
      // page = PATHNAME_COMPONENT_MAP["/login"];
      history.replaceState({}, "", "/login");
      page = PATHNAME_COMPONENT_MAP["/login"];
    }

    document.body.querySelector("#content").innerHTML = page();

    if (window.location.pathname === "/login") {
      const header = document.querySelector("header");
      const navigation = document.querySelector("nav");
      const footer = document.querySelector("footer");

      header && header.remove();
      navigation && navigation.remove();
      footer && footer.remove();

      return;
    }

    document.querySelector("#headerWrapper").innerHTML =
      Header() + Navigation();

    document.querySelector("#footerWrapper").innerHTML = Footer();

    return;
  }

  document.body.querySelector("#root").innerHTML = Error();
};

export const addEventListenerToLink = () => {
  const pathname = window.location.href;
  const aTagList = document.body.querySelectorAll("a");

  aTagList.forEach((aTag) => {
    if (aTag.href === pathname) {
      aTag.style.color = "rgb(37 99 235)";
    } else {
      aTag.style.color = "rgb(75 85 99)";
    }
  });
};
