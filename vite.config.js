import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: {
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
    jsxInject: `import { createElement, Fragment } from '@/utils/element'`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
