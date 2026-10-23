import { defineConfig } from "astro/config";

import { siteConfig } from "./src/data/site";

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
