import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: 'https://www.josephkenyon.co.uk',
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  }
});