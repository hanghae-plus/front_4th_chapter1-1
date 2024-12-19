import { UserStore } from "../store";
import { HASH_ROUTER, ROUTER } from "../constants";

const validateFactory = (path, router) => {
  const user = new UserStore().get();
  if (!user && path === router.profile) {
    return router.login;
  }
  if (user && path === router.login) {
    return router.main;
  }

  return path;
};

export const validateUserPath = (route) => validateFactory(route, ROUTER);

export const validateUserHash = (route) => validateFactory(route, HASH_ROUTER);
