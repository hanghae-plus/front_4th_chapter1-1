import ROUTES from "./routes";

export default function browserRouter(pathname, push = true) {
  if (ROUTES[pathname]) {
    if (push) {
      history.pushState({}, "", pathname);
    }

    ROUTES[pathname]();
    return;
  }

  ROUTES["*"]();
}
