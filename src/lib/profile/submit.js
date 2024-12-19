import userStore from "@/stores/UserStore";

const onSubmitUserData = () => {
  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 폼 제출시 새로고침 방지
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };

    userStore.setUser(userData);
  });
};

export { onSubmitUserData };
