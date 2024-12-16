interface ImportMetaEnv {
  readonly VITE_ROUTER_MODE: "hash" | "history";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
