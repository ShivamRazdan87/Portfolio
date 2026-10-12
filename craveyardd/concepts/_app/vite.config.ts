import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Builds concepts 2, 3 and 5 as static pages next to concepts 1 and 4.
// Output: ../2-21st-dev, ../3-gsap-21st, ../5-all-combined (shared code in ../_assets).
export default defineConfig({
  root: resolve(__dirname, "pages"),
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  build: {
    outDir: resolve(__dirname, ".."),
    emptyOutDir: false,
    assetsDir: "_assets",
    rollupOptions: {
      input: {
        concept2: resolve(__dirname, "pages/2-21st-dev/index.html"),
        concept3: resolve(__dirname, "pages/3-gsap-21st/index.html"),
        concept5: resolve(__dirname, "pages/5-all-combined/index.html"),
      },
    },
  },
})
