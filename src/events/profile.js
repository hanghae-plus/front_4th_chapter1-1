import { setState } from "./../store/store";

const handleProfileUpdate = (e) => {
  e.preventDefault();

  const profileBtn = document.getElementById("profile-form");

  if (profileBtn) {
    const usernameInput = document.getElementById("username").value;
    const emailInput = document.getElementById("email").value;
    const bioInput = document.getElementById("bio").value;

    const updatedInfo = {
      username: usernameInput,
      email: emailInput,
      bio: bioInput,
    };

    setState({ user: updatedInfo });

    localStorage.setItem("user", JSON.stringify(updatedInfo));
  }
};

export const initProfile = () => {
  document.body.addEventListener("submit", handleProfileUpdate);
};
