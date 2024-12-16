import { useRouter } from "../router/lib/hooks";
import { routes } from "../router/routes";

function AuthLayout(children) {
  const router = useRouter();

  const isAuthenticated = localStorage.getItem("user");

  if (!isAuthenticated) {
    router.navigate("/login", true);
    return routes["/login"]();
  }

  return children;
}

export { AuthLayout };
