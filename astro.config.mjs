import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://khoan.github.io',
  markdown: {
    shikiConfig: {
      theme: 'night-owl-light'
    }
  }
});
