import "./main.js";
import { useRouter } from "./utils/useRouter";

const { router } = useRouter("hash");

window.addEventListener("hashchange", () => router());
