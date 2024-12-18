import { setState } from "./../store/store";

const handleProfileUpdate = () => {
  const usernameInput = document.getElementById("username")?.value;
  const emailInput = document.getElementById("email")?.value;
  const bioInput = document.getElementById("bio")?.value;

  const updatedInfo = {
    username: usernameInput,
    email: emailInput,
    bio: bioInput,
  };

  localStorage.setItem("user", JSON.stringify(updatedInfo));

  setState({ user: updatedInfo });
};

export const initProfile = () => {
  document.body.addEventListener("submit", (e) => {
    e.preventDefault();

    // profile-form을 정확히 찾기 위해 closest 사용
    const profileForm = e.target.closest("#profile-form");
    if (!profileForm) return;

    handleProfileUpdate();
  });
};
