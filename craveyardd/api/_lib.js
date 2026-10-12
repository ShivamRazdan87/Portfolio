// Shared helpers for the CraveYardd admin API (Vercel Functions).
// Files starting with "_" are not exposed as routes.
//
// Environment variables (Vercel project → Settings → Environment Variables):
//   ADMIN_PASSWORD         password the client uses on /admin
//   SESSION_SECRET         long random string used to sign login cookies
//   BLOB_READ_WRITE_TOKEN  added automatically when a Vercel Blob store is connected
// For local testing only: LOCAL_STORE_DIR (stores content and uploads on disk instead of Blob).

import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"

const COOKIE = "cy_admin"
const SESSION_DAYS = 7
const KEEP_VERSIONS = 10

/* ---------------- HTTP helpers ---------------- */
export function send(res, status, body, headers = {}) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  res.end(JSON.stringify(body))
}

export async function readJson(req, limit = 4_000_000) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body
  if (typeof req.body === "string") return JSON.parse(req.body)
  const chunks = []
  let size = 0
  for await (const c of req) {
    size += c.length
    if (size > limit) throw Object.assign(new Error("Request too large"), { status: 413 })
    chunks.push(c)
  }
  const raw = Buffer.concat(chunks).toString("utf8")
  return raw ? JSON.parse(raw) : {}
}

/* ---------------- Auth ---------------- */
function secret() {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 16) throw Object.assign(new Error("SESSION_SECRET is not set (min 16 characters)"), { status: 500 })
  return s
}
function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url")
}
function safeEqual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}

export function checkPassword(given) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) throw Object.assign(new Error("ADMIN_PASSWORD is not set"), { status: 500 })
  return safeEqual(given ?? "", expected)
}

export function sessionCookie() {
  const exp = Date.now() + SESSION_DAYS * 864e5
  const payload = `admin.${exp}`
  const secure = process.env.LOCAL_STORE_DIR ? "" : " Secure;"
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly;${secure} SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`
}
export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
}

export function isLoggedIn(req) {
  const raw = (req.headers.cookie || "").split(/;\s*/).find((c) => c.startsWith(COOKIE + "="))
  if (!raw) return false
  const value = raw.slice(COOKIE.length + 1)
  const i = value.lastIndexOf(".")
  if (i < 0) return false
  const payload = value.slice(0, i), sig = value.slice(i + 1)
  const exp = Number(payload.split(".")[1])
  try {
    return safeEqual(sig, sign(payload)) && Number.isFinite(exp) && exp > Date.now()
  } catch {
    return false
  }
}

// Reject cross-site writes (the session cookie is SameSite=Strict as well).
export function sameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

/* ---------------- Storage: Vercel Blob, or local disk for testing ---------------- */
const useLocal = () => !process.env.BLOB_READ_WRITE_TOKEN && !!process.env.LOCAL_STORE_DIR

async function blob() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw Object.assign(new Error("No Vercel Blob store connected"), { status: 500 })
  return import("@vercel/blob")
}

export async function readContent() {
  if (useLocal()) {
    try {
      return JSON.parse(await fs.readFile(path.join(process.env.LOCAL_STORE_DIR, "content.json"), "utf8"))
    } catch {
      return null
    }
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  const { list } = await blob()
  const { blobs } = await list({ prefix: "content/site-", limit: 1000 })
  if (!blobs.length) return null
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  const r = await fetch(blobs[0].url, { cache: "no-store" })
  return r.ok ? r.json() : null
}

export async function writeContent(content) {
  const body = JSON.stringify(content)
  if (useLocal()) {
    await fs.mkdir(process.env.LOCAL_STORE_DIR, { recursive: true })
    await fs.writeFile(path.join(process.env.LOCAL_STORE_DIR, "content.json"), body)
    return
  }
  const { put, list, del } = await blob()
  // Each save is a new file (unique URL, so no stale CDN copies). Older versions are kept as a safety net.
  await put(`content/site-${Date.now()}.json`, body, { access: "public", addRandomSuffix: true, contentType: "application/json" })
  const { blobs } = await list({ prefix: "content/site-", limit: 1000 })
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  const old = blobs.slice(KEEP_VERSIONS).map((b) => b.url)
  if (old.length) await del(old)
}

export async function saveImage(name, buffer, contentType) {
  const safe = name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "photo"
  if (useLocal()) {
    const dir = path.join(process.env.LOCAL_STORE_DIR, "uploads")
    await fs.mkdir(dir, { recursive: true })
    const file = `${Date.now()}-${safe}`
    await fs.writeFile(path.join(dir, file), buffer)
    return `/local-uploads/${file}`
  }
  const { put } = await blob()
  const r = await put(`photos/${safe}`, buffer, { access: "public", addRandomSuffix: true, contentType })
  return r.url
}

/* ---------------- Validation: whitelist and clean everything that is saved ---------------- */
const str = (v, max = 300) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "")
const num = (v, min = 0, max = 1000) => {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v
  return typeof n === "number" && Number.isFinite(n) && n >= min && n <= max ? Math.round(n * 100) / 100 : undefined
}
const httpsUrl = (v) => {
  const s = str(v, 500)
  try {
    return s && new URL(s).protocol === "https:" ? s : ""
  } catch {
    return ""
  }
}
function image(v) {
  const s = str(v, 500)
  if (!s) return ""
  if (/^assets\/photos\/[\w.-]+$/.test(s)) return s
  if (/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+$/i.test(s)) return s
  if (process.env.LOCAL_STORE_DIR && /^\/local-uploads\/[\w.-]+$/.test(s)) return s
  return ""
}
const list = (v, max, fn) => (Array.isArray(v) ? v.slice(0, max).map(fn).filter((x) => x !== "" && x != null) : [])

export function cleanContent(input) {
  const c = input && typeof input === "object" ? input : {}
  const cfg = c.config || {}
  const site = c.site || {}
  const email = str(cfg.email, 120)
  const out = {
    config: {
      instagram: str(cfg.instagram, 60).replace(/^@/, "").replace(/[^\w.]/g, ""),
      tiktokUrl: httpsUrl(cfg.tiktokUrl),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
      phone: str(cfg.phone, 30).replace(/[^\d+ ()-]/g, ""),
      whatsapp: str(cfg.whatsapp, 20).replace(/\D/g, "").slice(0, 15),
      formEndpoint: httpsUrl(cfg.formEndpoint),
    },
    site: {
      headline: str(site.headline, 120),
      sub: str(site.sub, 300),
      heroImage: image(site.heroImage),
      about: str(site.about, 1500),
      eventsTitle: str(site.eventsTitle, 120),
      events: str(site.events, 800),
      occasions: list(site.occasions, 20, (o) => str(o, 40)),
      place: str(site.place, 120),
      address: str(site.address, 160),
      mapQuery: str(site.mapQuery, 200),
      hours: str(site.hours, 120),
      hoursShort: str(site.hoursShort, 30),
      openHour: num(site.openHour, 0, 23),
      closeHour: num(site.closeHour, 1, 24),
      allergen: str(site.allergen, 300),
    },
    menu: list(c.menu, 20, (cat) => {
      if (!cat || typeof cat !== "object" || !str(cat.category, 60)) return null
      const out = { category: str(cat.category, 60), tagline: str(cat.tagline, 160) }
      const p = num(cat.price)
      if (p !== undefined) out.price = p
      out.items = list(cat.items, 40, (it) => {
        if (!it || typeof it !== "object" || !str(it.name, 80)) return null
        const item = { name: str(it.name, 80), description: str(it.description, 400), image: image(it.image) }
        const ip = num(it.price)
        if (ip !== undefined) item.price = ip
        const fav = num(it.favourite, 1, 99)
        if (fav !== undefined) item.favourite = Math.round(fav)
        const tag = str(it.tag, 30)
        if (tag) item.tag = tag
        return item
      })
      const groups = list(cat.groups, 10, (g) => {
        if (!g || typeof g !== "object" || !str(g.title, 40)) return null
        return { title: str(g.title, 40), options: list(g.options, 40, (o) => str(o, 40)) }
      })
      if (groups.length) out.groups = groups
      return out
    }),
    gallery: list(c.gallery, 12, image),
    updatedAt: new Date().toISOString(),
  }
  for (const k of Object.keys(out.site)) if (out.site[k] === undefined || out.site[k] === "") delete out.site[k]
  if (!out.menu.length) throw Object.assign(new Error("The menu needs at least one category"), { status: 400 })
  return out
}

/** Wrap a handler so thrown errors become JSON responses. */
export function route(fn) {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (e) {
      const status = e.status || 500
      if (status >= 500) console.error(e)
      send(res, status, { error: status >= 500 && !e.status ? "Something went wrong" : e.message })
    }
  }
}
