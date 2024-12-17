import { ErrorPage } from "../../pages/error";
import { LoginPage } from "../../pages/login";
import { MainPage } from "../../pages/main";
import { ProfilePage } from "../../pages/profile";
import { MainLayout } from "../layout/main-layout";
import { authGuard, guestGuard } from "./lib/guards";

export const routes = [
  {
    path: "/",
    component: () => MainLayout(MainPage()),
  },
  {
    path: "/login",
    component: () => LoginPage(),
    guard: guestGuard,
  },
  {
    path: "/profile",
    component: () => MainLayout(ProfilePage()),
    guard: authGuard,
  },
  {
    path: "404",
    component: () => ErrorPage(),
  },
];
