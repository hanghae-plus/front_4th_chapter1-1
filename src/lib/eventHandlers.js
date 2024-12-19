import userStore from "./store.js";

export const setupEventHandlers = (router) => {
  const root = document.getElementById("root");

  root.addEventListener("click", (e) => {
    if (e.target.id === "logout") {
      userStore.logout();
    }
  });

  root.addEventListener("submit", (e) => {
    if (e.target.id === "login-form") {
      e.preventDefault();
      const { username } = e.target.elements;

      if (!username.value.trim()) {
        alert("유저 이름을 입력해 주세요.");
        return;
      }

      try {
        userStore.login(username.value);
        router.navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }

    if (e.target.id === "profile-form") {
      e.preventDefault();
      const { username, email, bio } = e.target.elements;

      const userData = {
        username: username.value,
        email: email.value,
        bio: bio.value,
      };

      try {
        userStore.updateProfile(userData);
        alert("프로필이 업데이트되었습니다.");
      } catch (error) {
        alert(error.message);
      }
    }
  });
};
