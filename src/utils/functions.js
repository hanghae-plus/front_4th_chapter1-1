import { Error } from "../components/ErrorPage";
import { Footer, Header, Navigation } from "../components/Layout";
import {
  addEventListenerToLoginForm,
  addEventListenerToProfileEditingForm,
  userManager,
} from "./user";
import { PATHNAME_COMPONENT_MAP } from "./router";
import { BIO_TEXTAREA, EMAIL_INPUT } from "../components/ProfilePage";

export const generatePage = () => {
  const pathname = window.location.pathname;

  let page = PATHNAME_COMPONENT_MAP[pathname];

  const { username, bio, email } = userManager.getData();

  if (page !== undefined) {
    if (pathname === "/profile" && username === null) {
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

      addEventListenerToLoginForm();
      return;
    }

    if (window.location.pathname === "/profile") {
      // const params = window.location.search;
      document.body.querySelector("#username").value = username;

      document.body.querySelector(`#${EMAIL_INPUT}`).value = email;
      document.body.querySelector(`#${BIO_TEXTAREA}`).value = bio;
      addEventListenerToProfileEditingForm();
      // if (params) {
      //   const [usernameParams, emailParams, bioParams] =
      //     params.split("?").at(1)?.split("&") ?? [];

      //   const usernameFromParams = usernameParams.split("=").at(1) ?? "";
      //   const emailFromParams = emailParams.split("=").at(1) ?? "";
      //   const bioFromPrams = bioParams.split("=").at(1) ?? "";

      //   userManager.setUserLocalStorage(
      //     usernameFromParams,
      //     bioFromPrams,
      //     emailFromParams,
      //   );
      // }
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
