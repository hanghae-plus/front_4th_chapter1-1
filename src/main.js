import { createRouter } from "./modules/router";
import { store } from "./modules/store";
import { createApp } from "./modules/app";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const router = createRouter({
  routes: {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
  },
  fallback: NotFoundPage,
});

const app = createApp({
  renderCurrentPage: () => {
    const matchedPage = router.matchRoute();

    document.querySelector("#root").innerHTML = matchedPage.render({
      router,
    });

    matchedPage.register({ router });
  },
});

router.subscribe(app);

store.subscribe(app);

app.init();
