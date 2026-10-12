import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Builds the CraveYardd website (Concept 5) into craveyardd/index.html and the admin page into
// craveyardd/admin/index.html, with their code in craveyardd/app/.
export default defineConfig({
  root: resolve(__dirname, "pages-site"),
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  build: {
    outDir: resolve(__dirname, "../.."),
    emptyOutDir: false,
    assetsDir: "app",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "pages-site/index.html"),
        admin: resolve(__dirname, "pages-site/admin/index.html"),
      },
    },
  },
})
