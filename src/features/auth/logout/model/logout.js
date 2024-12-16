import { useRouter } from "../../../../app/router/lib/hooks";

// src/features/auth/logout/model/logout.js
function handleLogout() {
  const router = useRouter();
  localStorage.removeItem("user");

  router.navigate("/login");
}

export { handleLogout };
