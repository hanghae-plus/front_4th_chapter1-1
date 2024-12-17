import { createRouter } from "../../../../app/router";

function useLoginForm() {
  // 라우터 생성
  const router = createRouter();

  // 폼 검증
  function validateForm(data) {
    const errors = {};

    if (!data.username) {
      errors.username = "사용자 이름을 입력해주세요.";
    } else if (data.username.length < 3) {
      errors.username = "사용자 이름은 3자 이상이어야 합니다.";
    }

    if (!data.password) {
      errors.password = "비밀번호를 입력해주세요.";
    } else if (data.password.length < 6) {
      errors.password = "비밀번호는 6자 이상이어야 합니다.";
    }

    return errors;
  }

  // 사용자 데이터 저장
  const saveUserData = (userData) => {
    const defaultUserData = {
      username: userData.username,
      email: "",
      bio: "",
    };

    // 로컬스토리지에 사용자 데이터 저장
    try {
      localStorage.setItem("user", JSON.stringify(defaultUserData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // 로그인 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const usernameInput = form.querySelector("#username");
    const passwordInput = form.querySelector("#password");

    const formData = {
      username: usernameInput?.value ?? "",
      password: passwordInput?.value ?? "",
    };

    // 유효성 검사 실행
    const errors = validateForm(formData);

    // 에러 메시지 초기화
    const errorElements = form.querySelectorAll(".error-message");
    errorElements.forEach((el) => el.remove());

    // 에러가 있는 경우
    if (Object.keys(errors).length > 0) {
      // 각 필드에 에러 메시지 표시
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

    // 유효성 검사 통과 시 처리
    saveUserData({ username: formData.username });
    router.navigate("/");
  };

  return {
    handleSubmit,
  };
}

export { useLoginForm };
