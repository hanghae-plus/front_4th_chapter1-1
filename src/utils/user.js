import { LOGIN_FORM_ID, USER_NAME_INPUT_ID } from "../components/LoginPage";
import {
  BIO_TEXTAREA,
  EMAIL_INPUT,
  PROFILE_FORM_ID,
} from "../components/ProfilePage";

const USER_INFO_LOCAL_STORAGE_NAME = "user";
export const customLoginEvent = new CustomEvent("login");
export const customEditProfileEvent = new CustomEvent("editProfile");

/**
 *
 * @returns get
 */
const createUserManager = () => {
  let username = null;
  let email = null;
  let bio = null;

  return {
    getData: () => ({ username, email, bio }),
    getUserName: () => username,
    getBio: () => bio,
    getEmail: () => email,
    getUserDataFromLocalStorage: () => {
      const userData = JSON.parse(
        localStorage.getItem(USER_INFO_LOCAL_STORAGE_NAME),
      );

      const {
        username: userNameFromLocalStorage,
        email: emailFromLocalStorage,
        bio: bioFromLocalStorage,
      } = userData ?? {};

      username = userNameFromLocalStorage ?? null;
      email = emailFromLocalStorage;
      bio = bioFromLocalStorage;
    },
    setUserLocalStorage: (userNameFromInput, bio, email) => {
      const userDataValueMap = {
        username: userNameFromInput,
        email: email ?? "",
        bio: bio ?? "",
      };

      localStorage.setItem(
        USER_INFO_LOCAL_STORAGE_NAME,
        JSON.stringify(userDataValueMap),
      );

      username = userNameFromInput;
    },
    resetUserLocalStorage: () => {
      localStorage.removeItem(USER_INFO_LOCAL_STORAGE_NAME);
    },
  };
};

export const userManager = createUserManager();

userManager.getUserDataFromLocalStorage();

// 로그인 버튼에 이벤트 리스너 추가하는 로직
// export const addEventListenerToLoginButton = () => {
//   document.body.querySelector("#loginButton").addEventListener("click", (e) => {
//     e.preventDefault();

//     document.body
//       .querySelector("#login-form")
//       .dispatchEvent(new SubmitEvent("submit"));
//   });
// };

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

const updateTabState = () => {
  const signLink = document.querySelector("#signLink");
  const profileLink = document.querySelector("#profileLink");

  if (signLink && profileLink) {
    const userName = userManager.getUserName();

    profileLink.parentNode.style.display = userName ? "block" : "none";
    signLink.textContent = userName ? "로그아웃" : "로그인";
    signLink.id = userName ? "logout" : "login";
    signLink.href = userName ? "/#" : "/login";
  }
};

export const initTabs = () => {
  updateTabState();
  window.addEventListener("popstate", updateTabState);
  window.addEventListener("urlChange", updateTabState);
};
