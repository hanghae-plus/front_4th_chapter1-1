import { authStore } from "../store/AuthStore";

export const authGuard = (protectedRoute, fallbackRoute) => {
  if (authStore.isLogin()) {
    protectedRoute();
  } else {
    fallbackRoute();
  }
};
