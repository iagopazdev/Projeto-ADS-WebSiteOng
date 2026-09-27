import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const base = process.env.GITHUB_ACTIONS === "true"
  ? "/Projeto-ADS-WebSiteOng/"
  : "/";

export default defineConfig({
  base,
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "index.html"),
        app: resolve(projectRoot, "html/projeto.html"),
      },
    },
  },
});