const login = () => {
  const loginForm = document.querySelector("form");
  console.log("lf : ", loginForm);
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log("Username:", username);
      console.log("Password:", password);
    });
  }
};

export default login;
