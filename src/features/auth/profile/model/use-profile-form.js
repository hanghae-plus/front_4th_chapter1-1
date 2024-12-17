function useProfileForm() {
  // 라우터 생성

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error getting user data:", error);
      return {};
    }
  }
  const user = getUser();

  // 사용자 데이터 저장
  const saveUserData = (data) => {
    const defaultUserData = {
      username: data.username,
      email: data.email,
      bio: data.bio,
    };

    // 로컬스토리지에 사용자 데이터 저장
    try {
      localStorage.setItem("user", JSON.stringify(defaultUserData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  function validateForm(data) {
    const errors = {};
    if (!data.username) {
      errors.username = "사용자 이름은 필수 항목입니다.";
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const usernameInput = form.querySelector("#username");
    const emailInput = form.querySelector("#email");
    const bioInput = form.querySelector("#bio");

    const formData = {
      username: usernameInput?.value ?? "",
      email: emailInput?.value ?? "",
      bio: bioInput?.value ?? "",
    };

    const errors = validateForm(formData);

    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((el) => el.remove());

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        const input = form.querySelector(`#${field}`);
        if (input) {
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message text-red-500 text-sm mt-1";
          errorDiv.textContent = message;
          input.parentNode?.appendChild(errorDiv);
        }
      });
      return;
    }

    saveUserData(formData);
  }

  return { handleSubmit, user };
}

export { useProfileForm };
