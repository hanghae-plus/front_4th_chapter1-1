// src/features/auth/login/model/use-login-form.ts
import { useRouter } from "../../../../app/router/lib/hooks";

function useLoginForm() {
  const router = useRouter();

  const saveUserData = (userData) => {
    const defaultUserData = {
      username: userData.username,
      email: "",
      bio: "",
    };

    localStorage.setItem("user", JSON.stringify(defaultUserData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const username = usernameInput?.value;

    if (!username) {
      alert("사용자 이름을 입력해주세요.");
      return;
    }

    saveUserData({ username });
    router.navigate("/");
  };

  return {
    handleSubmit,
  };
}

export { useLoginForm };
