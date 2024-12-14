const USER_LOCAL_STORAGE_NAME = "userInfo";

export const [userName, introduction] = localStorage
  .getItem(USER_LOCAL_STORAGE_NAME)
  ?.split(",") ?? [null, null];

export const initAuth = () => {
  const singLink = document.querySelector("#signLink");
  const profileLink = document.querySelector("#profileLink");

  profileLink.parentNode.style.display = userName ? "block" : "none";
  singLink.textContent = userName ? "로그아웃" : "로그인";
  singLink.href = userName ? "/#" : "/login";
};
