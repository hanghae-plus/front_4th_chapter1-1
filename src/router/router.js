import ROUTES from "./routes";

export default function router(pathname) {
  if (ROUTES[pathname]) {
    history.pushState({}, "", pathname);

    ROUTES[pathname]();
    return;
  }

  ROUTES["*"]();
}
