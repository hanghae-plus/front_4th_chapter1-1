import { useRouter } from "./utils/useRouter";

const { router } = useRouter();

window.addEventListener("load", () => router());
window.addEventListener("popstate", () => router());
