const handleProfileUpdate = (e) => {
  e.preventDefault();

  const profileBtn = document.querySelector("#profile-form");

  console.log(document.querySelector("header"));
  if (profileBtn) {
    const usernameInput = document.querySelector(
      'input[name="username"]',
    ).value;
    const emailInput = document.querySelector('input[name="email"]').value;
    const bioInput = document.querySelector('textarea[name="bio"]').value;

    const formattedInfo = JSON.stringify({
      username: usernameInput,
      email: emailInput,
      bio: bioInput,
    });

    localStorage.setItem("user", formattedInfo);
  }
};

export const initProfile = () => {
  document.body.addEventListener("submit", handleProfileUpdate);
};
