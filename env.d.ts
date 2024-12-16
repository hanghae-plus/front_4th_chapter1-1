interface ImportMetaEnv {
  readonly VITE_ROUTER_MODE: "hash" | "history";
  readonly TEST?: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
