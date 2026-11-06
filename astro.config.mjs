import { defineConfig } from "astro/config";

// Static output: `npm run build` writes plain HTML/CSS/JS to dist/ for Cloudflare Pages.
export default defineConfig({
  output: "static",
});
