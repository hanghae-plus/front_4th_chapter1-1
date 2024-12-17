import ROUTES from "./routes";

export default function router(pathname, push = true) {
  if (ROUTES[pathname]) {
    if (push) {
      history.pushState({}, "", pathname);
    }

    ROUTES[pathname]();
    return;
  }

  ROUTES["*"]();
}
