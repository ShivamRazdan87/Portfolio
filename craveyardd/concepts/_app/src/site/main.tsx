import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles.css"

type W = Window & { CRAVEYARDD?: unknown; CRAVEYARDD_ROOT?: string }

// Load the content saved on /admin. If there is none yet (or the API is unavailable),
// the defaults from data.js are used, so the site always renders.
async function start() {
  const w = window as W
  const root = w.CRAVEYARDD_ROOT ?? "../../"
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 2500)
    const r = await fetch(`${root}api/content`, { signal: ctrl.signal, headers: { Accept: "application/json" } })
    clearTimeout(t)
    if (r.ok && (r.headers.get("content-type") || "").includes("json")) {
      const saved = await r.json()
      if (saved && Array.isArray(saved.menu) && saved.menu.length) w.CRAVEYARDD = saved
    }
  } catch {
    /* keep data.js defaults */
  }
  const { default: App } = await import("./App")
  createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)
}
start()
