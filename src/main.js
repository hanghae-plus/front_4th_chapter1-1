import { createRouter } from "@/router/createRouter";
import { submitEventHandler, clickEventHandler } from "./utils";

const { router } = createRouter();

document.body.addEventListener("submit", submitEventHandler);
document.body.addEventListener("click", clickEventHandler);
window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());
window.addEventListener("hashchange", () => router());
