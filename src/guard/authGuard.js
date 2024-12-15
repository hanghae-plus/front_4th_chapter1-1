import { useAuth } from "../store/useAuth";

const auth = new useAuth();

export const authGuard = (protectedRoute, fallbackRoute) => {
  if (auth.isLogin()) {
    protectedRoute();
  } else {
    fallbackRoute();
  }
};
