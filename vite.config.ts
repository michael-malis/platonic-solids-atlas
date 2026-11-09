import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // GitHub Pages serves the app below the repository name in production.
  base: process.env.GITHUB_ACTIONS ? "/platonic-solids-atlas/" : "/",
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        ru: resolve(root, "ru/index.html"),
      },
    },
  },
});
