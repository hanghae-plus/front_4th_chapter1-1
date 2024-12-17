import { setState } from "./../store/store";

const handleProfileUpdate = (e) => {
  e.preventDefault();

  const profileForm = document.getElementById("profile-form");

  if (profileForm) {
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
  }
};

export const initProfile = () => {
  document.body.addEventListener("submit", handleProfileUpdate);
};
