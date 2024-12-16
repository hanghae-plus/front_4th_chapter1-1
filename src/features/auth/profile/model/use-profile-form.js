// import { useRouter } from "../../../../app/router/lib/hooks";

function useProfileForm() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  // const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
    };

    // if (JSON.stringify(newUserData) === JSON.stringify(user)) {
    //   alert("변경된 내용이 없습니다.");
    //   return;
    // }

    localStorage.setItem("user", JSON.stringify(newUserData));

    // alert("프로필 업데이트가 완료되었습니다.");
    // router.navigate("/");
  };
  return { handleSubmit, user };
}

export { useProfileForm };
