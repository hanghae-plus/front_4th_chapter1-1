import { LOGIN_FORM_ID, USER_NAME_INPUT_ID } from "../pages/LoginPage";
import {
  BIO_TEXTAREA,
  EMAIL_INPUT,
  PROFILE_FORM_ID,
} from "../pages/ProfilePage";

const USER_INFO_LOCAL_STORAGE_NAME = "user";
export const customLoginEvent = new CustomEvent("login");
export const customEditProfileEvent = new CustomEvent("editProfile");

const createUserManager = () => {
  let username = "";
  let email = "";
  let bio = "";

  const userData = JSON.parse(
    localStorage.getItem(USER_INFO_LOCAL_STORAGE_NAME),
  );

  const {
    username: userNameFromLocalStorage,
    email: emailFromLocalStorage,
    bio: bioFromLocalStorage,
  } = userData ?? {};

  username = userNameFromLocalStorage ?? "";
  email = emailFromLocalStorage ?? "";
  bio = bioFromLocalStorage ?? "";

  return {
    isLogin: () => !!username,
    getData: () => ({ username, email, bio }),
    setUserLocalStorage: (userDataMap) => {
      const refinedUserDataMap = userDataMap ?? {
        username: "",
        email: "",
        bio: "",
      };

      localStorage.setItem(
        USER_INFO_LOCAL_STORAGE_NAME,
        JSON.stringify(refinedUserDataMap),
      );

      username = refinedUserDataMap["username"] ?? "";
    },
    resetUserLocalStorage: () => {
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_NAME);
    },
  };
};

export const addEventListenerToLoginForm = () => {
  document.body
    .querySelector(`#${LOGIN_FORM_ID}`)
    .addEventListener("submit", () => {
      const userName = document.body.querySelector(
        `#${USER_NAME_INPUT_ID}`,
      )?.value;

      userManager.setUserLocalStorage(userName, "", "");
      window.dispatchEvent(customLoginEvent);
    });
};

export const addEventListenerToProfileEditingForm = () => {
  const form = document.getElementById(PROFILE_FORM_ID);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userDataKeyValueMap = {
      [USER_NAME_INPUT_ID]: "",
      [EMAIL_INPUT]: "",
      [BIO_TEXTAREA]: "",
    };

    const editProfileFields = form.querySelectorAll("input, textarea");
    editProfileFields.forEach((input) => {
      userDataKeyValueMap[input.name] = input.value;
    });

    userManager.setUserLocalStorage(
      userDataKeyValueMap[USER_NAME_INPUT_ID],
      userDataKeyValueMap[BIO_TEXTAREA],
      userDataKeyValueMap[EMAIL_INPUT],
    );
  });
};

export const userManager = createUserManager();
