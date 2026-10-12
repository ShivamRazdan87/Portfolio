import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Builds the main CraveYardd website (Concept 5) into craveyardd/index.html, with its code in craveyardd/app/.
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
  },
})
