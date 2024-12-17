export function authGuard(router) {
  console.log(router);
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
