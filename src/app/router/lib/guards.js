// TODO: 리팩토링 고려

export function authGuard(router) {
  if (!localStorage.getItem("user")) {
    router.navigate("/login");
    return false;
  }
  return true;
}

export function guestGuard(router) {
  if (localStorage.getItem("user")) {
    router.navigate("/");
    return false;
  }
  return true;
}
