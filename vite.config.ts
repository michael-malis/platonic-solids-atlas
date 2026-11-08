import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves the app below the repository name in production.
  base: process.env.GITHUB_ACTIONS ? "/platonic-solids-atlas/" : "/",
});
