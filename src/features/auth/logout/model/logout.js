import { createRouter } from "../../../../app/router";

function handleLogout(event) {
  event.preventDefault();

  const router = createRouter();
  localStorage.removeItem("user");

  router.navigate("/login");
}

export { handleLogout };
