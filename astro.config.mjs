import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    site: 'https://www.josephkenyon.co.uk',
    output: 'static'
});