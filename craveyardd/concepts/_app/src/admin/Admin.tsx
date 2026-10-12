import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { ArrowDown, ArrowUp, Check, ExternalLink, ImagePlus, Loader2, LogOut, Plus, Trash2, Upload } from "lucide-react"
import type { Category, Item, SiteData, SiteText } from "../shared"

/*
 * CraveYardd admin – edit menu, photos, business text and contact details.
 * Talks to the Vercel Functions in craveyardd/api/. Saving publishes immediately.
 */

const ROOT = "../" // admin lives at craveyardd/admin/
const api = (p: string) => `${ROOT}api/${p}`
const preview = (src?: string) => (!src ? "" : /^(https?:)?\/\//.test(src) || src.startsWith("/") ? src : ROOT + src)

type Content = SiteData & { updatedAt?: string }
const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v))

/* ---------------- Image upload (resized in the browser first) ---------------- */
async function shrink(file: File): Promise<{ type: string; data: string }> {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bmp.width * scale)
  canvas.height = Math.round(bmp.height * scale)
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height)
  let blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/webp", 0.85))
  if (!blob || blob.type !== "image/webp") blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85))
  if (!blob) throw new Error("Could not read that image")
  const buf = new Uint8Array(await blob.arrayBuffer())
  let bin = ""
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000))
  return { type: blob.type, data: btoa(bin) }
}
async function uploadImage(file: File): Promise<string> {
  const { type, data } = await shrink(file)
  const r = await fetch(api("upload"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: file.name, type, data }) })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.error || "Upload failed")
  return j.url as string
}

/* ---------------- Small UI pieces ---------------- */
const input = "w-full min-h-12 rounded-2xl border-2 border-choc/15 bg-white px-4 text-base outline-none transition focus:border-rasp focus:ring-4 focus:ring-hot/20"
const btn = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 font-extrabold transition disabled:opacity-50"

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-extrabold text-choc">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-ink">{hint}</span>}
    </label>
  )
}
function Text({ value, onChange, ...p }: { value?: string; onChange: (v: string) => void; placeholder?: string; type?: string; inputMode?: "numeric" | "decimal" | "tel" | "email" | "url" }) {
  return <input className={input} value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...p} />
}
function Area({ value, onChange, rows = 3 }: { value?: string; onChange: (v: string) => void; rows?: number }) {
  return <textarea className={`${input} py-3`} rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
}
function NumberField({ value, onChange, placeholder, step = "0.01" }: { value?: number; onChange: (v?: number) => void; placeholder?: string; step?: string }) {
  const [raw, setRaw] = useState(value == null ? "" : String(value))
  useEffect(() => setRaw(value == null ? "" : String(value)), [value])
  return (
    <input className={input} inputMode="decimal" type="number" step={step} min="0" placeholder={placeholder} value={raw}
      onChange={(e) => { setRaw(e.target.value); const n = parseFloat(e.target.value); onChange(e.target.value === "" || Number.isNaN(n) ? undefined : n) }} />
  )
}
function MoveButtons({ onUp, onDown, onDelete, label }: { onUp?: () => void; onDown?: () => void; onDelete: () => void; label: string }) {
  return (
    <div className="flex gap-1">
      <button type="button" className={`${btn} size-11 bg-blush px-0 text-choc`} onClick={onUp} disabled={!onUp} aria-label={`Move ${label} up`}><ArrowUp className="size-4" /></button>
      <button type="button" className={`${btn} size-11 bg-blush px-0 text-choc`} onClick={onDown} disabled={!onDown} aria-label={`Move ${label} down`}><ArrowDown className="size-4" /></button>
      <button type="button" className={`${btn} size-11 bg-blush px-0 text-rasp`} onClick={onDelete} aria-label={`Delete ${label}`}><Trash2 className="size-4" /></button>
    </div>
  )
}
function PhotoPicker({ value, onChange, label }: { value?: string; onChange: (v: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-20 flex-none place-items-center overflow-hidden rounded-2xl bg-blush text-center text-[11px] font-bold text-muted-ink">
        {value ? <img src={preview(value)} alt="" className="size-full object-cover" /> : "No photo"}
      </div>
      <div className="flex flex-wrap gap-2">
        <input ref={ref} type="file" accept="image/*" className="sr-only" aria-label={`Upload photo for ${label}`}
          onChange={async (e) => {
            const f = e.target.files?.[0]; e.target.value = ""
            if (!f) return
            setBusy(true); setErr("")
            try { onChange(await uploadImage(f)) } catch (x) { setErr((x as Error).message) } finally { setBusy(false) }
          }} />
        <button type="button" className={`${btn} bg-choc text-white`} onClick={() => ref.current?.click()} disabled={busy}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} {value ? "Change photo" : "Upload photo"}
        </button>
        {value && <button type="button" className={`${btn} bg-blush text-rasp`} onClick={() => onChange("")}>Remove</button>}
        {err && <span className="w-full text-sm font-bold text-rasp" role="alert">{err}</span>}
      </div>
    </div>
  )
}
const move = <T,>(arr: T[], i: number, d: number) => { const a = [...arr]; const [x] = a.splice(i, 1); a.splice(i + d, 0, x); return a }

/* ---------------- Login ---------------- */
function Login({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("")
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_30%,#fff,var(--color-blush)_45%,var(--color-baby))] px-4">
      <form className="w-full max-w-sm rounded-[32px] bg-white p-7 text-center shadow-xl"
        onSubmit={async (e) => {
          e.preventDefault(); setBusy(true); setErr("")
          const r = await fetch(api("login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) }).catch(() => null)
          setBusy(false)
          if (r?.ok) onDone()
          else setErr(r ? ((await r.json().catch(() => ({}))).error || "Login failed") : "Can’t reach the server")
        }}>
        <img src={`${ROOT}assets/logo.webp`} alt="CraveYardd" className="mx-auto h-24 w-auto" />
        <h1 className="mt-3 font-display text-3xl font-semibold text-choc">Website admin</h1>
        <p className="mb-5 text-sm text-muted-ink">Edit your menu, photos and details.</p>
        <label className="block text-left">
          <span className="mb-1 block text-sm font-extrabold text-choc">Password</span>
          <input type="password" autoComplete="current-password" required className={input} value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        {err && <p role="alert" className="mt-3 font-bold text-rasp">{err}</p>}
        <button type="submit" disabled={busy} className={`${btn} mt-5 min-h-13 w-full bg-rasp text-white hover:bg-rasp-deep`}>
          {busy && <Loader2 className="size-4 animate-spin" />} Log in
        </button>
      </form>
    </main>
  )
}

/* ---------------- Editors ---------------- */
function MenuEditor({ menu, setMenu }: { menu: Category[]; setMenu: (m: Category[]) => void }) {
  const setCat = (i: number, c: Category) => setMenu(menu.map((x, j) => (j === i ? c : x)))
  return (
    <div className="grid gap-6">
      {menu.map((cat, ci) => (
        <section key={ci} className="rounded-[28px] bg-white p-5 shadow-sm md:p-6" aria-label={cat.category || "New category"}>
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-48 flex-1"><Field label="Category name"><Text value={cat.category} onChange={(v) => setCat(ci, { ...cat, category: v })} /></Field></div>
            <div className="w-36"><Field label="Price for all (£)" hint="Optional"><NumberField value={cat.price} onChange={(v) => setCat(ci, { ...cat, price: v })} /></Field></div>
            <MoveButtons label={`category ${cat.category}`}
              onUp={ci > 0 ? () => setMenu(move(menu, ci, -1)) : undefined}
              onDown={ci < menu.length - 1 ? () => setMenu(move(menu, ci, 1)) : undefined}
              onDelete={() => confirm(`Delete the whole “${cat.category}” category?`) && setMenu(menu.filter((_, j) => j !== ci))} />
          </div>
          <div className="mt-3"><Field label="Short line under the name"><Text value={cat.tagline} onChange={(v) => setCat(ci, { ...cat, tagline: v })} /></Field></div>

          <div className="mt-5 grid gap-3">
            {(cat.items ?? []).map((it, ii) => {
              const items = cat.items ?? []
              const setItem = (n: Item) => setCat(ci, { ...cat, items: items.map((x, j) => (j === ii ? n : x)) })
              return (
                <details key={ii} className="group rounded-3xl border-2 border-choc/10 bg-cream/60 p-4 open:bg-white">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-extrabold text-choc">
                    {it.image ? <img src={preview(it.image)} alt="" className="size-11 rounded-xl object-cover" /> : <span className="grid size-11 place-items-center rounded-xl bg-blush text-xs">—</span>}
                    <span className="flex-1">{it.name || "New item"}</span>
                    <span className="text-sm text-rasp-deep">{typeof it.price === "number" ? `£${it.price.toFixed(2)}` : cat.price != null ? `£${cat.price.toFixed(2)}` : ""}</span>
                    {it.favourite ? <span className="rounded-full bg-baby px-2 py-0.5 text-xs">♥ {it.favourite}</span> : null}
                  </summary>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Field label="Name"><Text value={it.name} onChange={(v) => setItem({ ...it, name: v })} /></Field>
                    <Field label="Own price (£)" hint={cat.price != null ? `Leave empty to use £${cat.price.toFixed(2)}` : undefined}><NumberField value={typeof it.price === "number" ? it.price : undefined} onChange={(v) => setItem({ ...it, price: v })} /></Field>
                    <div className="md:col-span-2"><Field label="Description"><Area value={it.description} onChange={(v) => setItem({ ...it, description: v })} /></Field></div>
                    <Field label="Favourite position" hint="1, 2, 3… shows it in “Most craved”. Empty = not a favourite."><NumberField step="1" value={it.favourite} onChange={(v) => setItem({ ...it, favourite: v ? Math.round(v) : undefined })} /></Field>
                    <Field label="Label on photo" hint="e.g. Signature, Fully loaded"><Text value={it.tag} onChange={(v) => setItem({ ...it, tag: v })} /></Field>
                    <div className="md:col-span-2"><span className="mb-1 block text-sm font-extrabold text-choc">Photo</span><PhotoPicker label={it.name} value={it.image} onChange={(v) => setItem({ ...it, image: v })} /></div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <MoveButtons label={it.name}
                      onUp={ii > 0 ? () => setCat(ci, { ...cat, items: move(items, ii, -1) }) : undefined}
                      onDown={ii < items.length - 1 ? () => setCat(ci, { ...cat, items: move(items, ii, 1) }) : undefined}
                      onDelete={() => confirm(`Delete “${it.name}”?`) && setCat(ci, { ...cat, items: items.filter((_, j) => j !== ii) })} />
                  </div>
                </details>
              )
            })}
            <button type="button" className={`${btn} justify-self-start bg-blush text-choc`} onClick={() => setCat(ci, { ...cat, items: [...(cat.items ?? []), { name: "New item", description: "", image: "" }] })}>
              <Plus className="size-4" /> Add item
            </button>
          </div>

          {(cat.groups ?? []).map((g, gi) => (
            <div key={gi} className="mt-4 grid gap-3 rounded-3xl bg-blush/60 p-4 md:grid-cols-[200px_1fr_auto] md:items-end">
              <Field label="Option group"><Text value={g.title} onChange={(v) => setCat(ci, { ...cat, groups: cat.groups!.map((x, j) => (j === gi ? { ...x, title: v } : x)) })} /></Field>
              <Field label="Options" hint="Separate with commas"><Text value={g.options.join(", ")} onChange={(v) => setCat(ci, { ...cat, groups: cat.groups!.map((x, j) => (j === gi ? { ...x, options: v.split(",").map((s) => s.trim()).filter(Boolean) } : x)) })} /></Field>
              <button type="button" className={`${btn} bg-white text-rasp`} onClick={() => setCat(ci, { ...cat, groups: cat.groups!.filter((_, j) => j !== gi) })}><Trash2 className="size-4" /> Remove</button>
            </div>
          ))}
          <button type="button" className={`${btn} mt-3 bg-white text-choc ring-2 ring-choc/10`} onClick={() => setCat(ci, { ...cat, groups: [...(cat.groups ?? []), { title: "Sauces", options: [] }] })}>
            <Plus className="size-4" /> Add option group (e.g. sauces, toppings)
          </button>
        </section>
      ))}
      <button type="button" className={`${btn} min-h-13 justify-self-start bg-choc text-white`} onClick={() => setMenu([...menu, { category: "New category", tagline: "", items: [] }])}>
        <Plus className="size-4" /> Add category
      </button>
    </div>
  )
}

function PhotosEditor({ c, set }: { c: Content; set: (c: Content) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  const gallery = c.gallery.filter(Boolean)
  return (
    <div className="grid gap-6">
      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-choc">Main photo</h2>
        <p className="mb-4 text-sm text-muted-ink">The big photo at the top of the home page.</p>
        <PhotoPicker label="main photo" value={c.site?.heroImage} onChange={(v) => set({ ...c, site: { ...c.site, heroImage: v } })} />
      </section>
      <section className="rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-choc">Gallery</h2>
        <p className="mb-4 text-sm text-muted-ink">Shown in the photo strip and “Follow the Cravings”. Up to 12 photos; the first 6 appear in the grid.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {gallery.map((g, i) => (
            <div key={g + i} className="rounded-3xl bg-cream p-2">
              <img src={preview(g)} alt={`Gallery photo ${i + 1}`} className="aspect-square w-full rounded-2xl object-cover" />
              <div className="mt-2 flex justify-center">
                <MoveButtons label={`photo ${i + 1}`}
                  onUp={i > 0 ? () => set({ ...c, gallery: move(gallery, i, -1) }) : undefined}
                  onDown={i < gallery.length - 1 ? () => set({ ...c, gallery: move(gallery, i, 1) }) : undefined}
                  onDelete={() => set({ ...c, gallery: gallery.filter((_, j) => j !== i) })} />
              </div>
            </div>
          ))}
          {gallery.length < 12 && (
            <button type="button" disabled={busy} onClick={() => ref.current?.click()} className="grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-hot bg-blush font-extrabold text-rasp-deep">
              <span className="grid justify-items-center gap-1">{busy ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}Add photo</span>
            </button>
          )}
        </div>
        <input ref={ref} type="file" accept="image/*" className="sr-only" aria-label="Add gallery photo"
          onChange={async (e) => {
            const f = e.target.files?.[0]; e.target.value = ""
            if (!f) return
            setBusy(true); setErr("")
            try { const url = await uploadImage(f); set({ ...c, gallery: [...gallery, url] }) } catch (x) { setErr((x as Error).message) } finally { setBusy(false) }
          }} />
        {err && <p role="alert" className="mt-3 font-bold text-rasp">{err}</p>}
      </section>
    </div>
  )
}

function InfoEditor({ c, set }: { c: Content; set: (c: Content) => void }) {
  const s = c.site ?? {}
  const up = (k: keyof SiteText, v: unknown) => set({ ...c, site: { ...s, [k]: v } })
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-choc">Home page</h2>
        <Field label="Headline"><Text value={s.headline} onChange={(v) => up("headline", v)} /></Field>
        <Field label="Text under the headline"><Area value={s.sub} onChange={(v) => up("sub", v)} rows={2} /></Field>
        <Field label="About us"><Area value={s.about} onChange={(v) => up("about", v)} rows={5} /></Field>
      </section>
      <section className="grid gap-4 rounded-[28px] bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-choc">Events</h2>
        <Field label="Events heading"><Text value={s.eventsTitle} onChange={(v) => up("eventsTitle", v)} /></Field>
        <Field label="Events text"><Area value={s.events} onChange={(v) => up("events", v)} rows={3} /></Field>
        <Field label="Types of events" hint="Separate with commas"><Text value={(s.occasions ?? []).join(", ")} onChange={(v) => up("occasions", v.split(",").map((x) => x.trim()).filter(Boolean))} /></Field>
      </section>
      <section className="grid gap-4 rounded-[28px] bg-white p-6 shadow-sm md:grid-cols-2">
        <h2 className="font-display text-2xl font-semibold text-choc md:col-span-2">Location &amp; opening hours</h2>
        <Field label="Where to find you"><Text value={s.place} onChange={(v) => up("place", v)} /></Field>
        <Field label="Address"><Text value={s.address} onChange={(v) => up("address", v)} /></Field>
        <div className="md:col-span-2"><Field label="Google Maps search" hint="What Google Maps should search for the map and directions"><Text value={s.mapQuery} onChange={(v) => up("mapQuery", v)} /></Field></div>
        <Field label="Opening hours (full)" hint="e.g. Open daily: 2:00 PM–11:00 PM"><Text value={s.hours} onChange={(v) => up("hours", v)} /></Field>
        <Field label="Opening hours (short)" hint="e.g. 2–11 PM"><Text value={s.hoursShort} onChange={(v) => up("hoursShort", v)} /></Field>
        <Field label="Opens at (hour, 0–23)" hint="Used for the live “Open now” badge. 14 = 2 PM"><NumberField step="1" value={s.openHour} onChange={(v) => up("openHour", v)} /></Field>
        <Field label="Closes at (hour, 1–24)" hint="23 = 11 PM, 24 = midnight"><NumberField step="1" value={s.closeHour} onChange={(v) => up("closeHour", v)} /></Field>
        <div className="md:col-span-2"><Field label="Allergen notice"><Area value={s.allergen} onChange={(v) => up("allergen", v)} rows={2} /></Field></div>
      </section>
    </div>
  )
}

function ContactEditor({ c, set }: { c: Content; set: (c: Content) => void }) {
  const cfg = c.config ?? {}
  const up = (k: string, v: string) => set({ ...c, config: { ...cfg, [k]: v } })
  return (
    <section className="grid gap-4 rounded-[28px] bg-white p-6 shadow-sm md:grid-cols-2">
      <h2 className="font-display text-2xl font-semibold text-choc md:col-span-2">Contact &amp; social</h2>
      <Field label="Instagram handle" hint="Without the @"><Text value={cfg.instagram} onChange={(v) => up("instagram", v)} /></Field>
      <Field label="TikTok link" hint="Full link, e.g. https://www.tiktok.com/@yourname"><Text type="url" value={cfg.tiktokUrl} onChange={(v) => up("tiktokUrl", v)} /></Field>
      <Field label="Email"><Text type="email" value={cfg.email} onChange={(v) => up("email", v)} /></Field>
      <Field label="Phone"><Text type="tel" value={cfg.phone} onChange={(v) => up("phone", v)} /></Field>
      <Field label="WhatsApp number" hint="Country code + number, digits only, e.g. 447700900123. Shows the WhatsApp button."><Text inputMode="numeric" value={cfg.whatsapp} onChange={(v) => up("whatsapp", v)} /></Field>
      <Field label="Enquiry form service" hint="Optional Formspree link. Without it, enquiries open the visitor’s email app (needs the email above)."><Text type="url" value={cfg.formEndpoint} onChange={(v) => up("formEndpoint", v)} /></Field>
    </section>
  )
}

/* ---------------- Admin shell ---------------- */
const TABS = ["Menu", "Photos", "Business info", "Contact & social"] as const

export default function Admin() {
  const [auth, setAuth] = useState<"checking" | "out" | "in">("checking")
  const [content, setContent] = useState<Content | null>(null)
  const [saved, setSaved] = useState("")
  const [tab, setTab] = useState<(typeof TABS)[number]>("Menu")
  const [state, setState] = useState<{ kind: "idle" | "saving" | "ok" | "err"; text?: string }>({ kind: "idle" })

  const load = useCallback(async () => {
    const r = await fetch(api("content"), { cache: "no-store" }).catch(() => null)
    const base = clone((window as unknown as { CRAVEYARDD: Content }).CRAVEYARDD)
    const c: Content = r?.ok ? await r.json() : base
    c.site = { ...(base.site ?? {}), ...(c.site ?? {}) }
    c.gallery = c.gallery ?? []
    setContent(c)
    setSaved(JSON.stringify(c))
  }, [])

  useEffect(() => {
    fetch(api("session"), { cache: "no-store" }).then((r) => r.json()).then((j) => setAuth(j.loggedIn ? "in" : "out")).catch(() => setAuth("out"))
  }, [])
  useEffect(() => { if (auth === "in") load() }, [auth, load])

  const dirty = useMemo(() => !!content && JSON.stringify(content) !== saved, [content, saved])
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = "" } }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  async function save() {
    if (!content) return
    setState({ kind: "saving" })
    const r = await fetch(api("content"), { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) }).catch(() => null)
    const j = r ? await r.json().catch(() => ({})) : {}
    if (r?.ok) {
      const c = j.content as Content
      c.site = { ...content.site, ...c.site }
      setContent(c); setSaved(JSON.stringify(c))
      setState({ kind: "ok", text: "Saved – your changes are live." })
    } else {
      if (r?.status === 401) setAuth("out")
      setState({ kind: "err", text: j.error || "Could not save. Check your connection and try again." })
    }
  }

  if (auth === "checking") return <div className="grid min-h-screen place-items-center"><Loader2 className="size-8 animate-spin text-rasp" /></div>
  if (auth === "out") return <Login onDone={() => setAuth("in")} />
  if (!content) return <div className="grid min-h-screen place-items-center"><Loader2 className="size-8 animate-spin text-rasp" /></div>

  return (
    <div className="min-h-screen bg-cream pb-32 font-nunito text-foreground">
      <header className="sticky top-0 z-30 border-b border-choc/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
          <div className="flex items-center gap-3">
            <img src={`${ROOT}assets/logo.webp`} alt="CraveYardd" className="h-11 w-auto" />
            <span className="hidden font-display text-xl font-semibold text-choc sm:inline">Admin</span>
          </div>
          <div className="flex gap-2">
            <a href={`${ROOT}index.html`} target="_blank" rel="noopener" className={`${btn} bg-white text-choc ring-2 ring-choc/10`}><ExternalLink className="size-4" /> View site</a>
            <button type="button" className={`${btn} bg-blush text-choc`} onClick={async () => { if (dirty && !confirm("You have unsaved changes. Log out anyway?")) return; await fetch(api("logout"), { method: "POST" }); setAuth("out") }}>
              <LogOut className="size-4" /> <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 pb-3" role="tablist" aria-label="Sections">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`${btn} flex-none ${tab === t ? "bg-choc text-white" : "bg-white text-choc ring-2 ring-choc/10"}`}>{t}</button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === "Menu" && <MenuEditor menu={content.menu} setMenu={(m) => setContent({ ...content, menu: m })} />}
        {tab === "Photos" && <PhotosEditor c={content} set={setContent} />}
        {tab === "Business info" && <InfoEditor c={content} set={setContent} />}
        {tab === "Contact & social" && <ContactEditor c={content} set={setContent} />}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-choc/10 bg-white/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className={`font-bold ${state.kind === "err" ? "text-rasp" : "text-choc"}`}>
            {state.kind === "saving" ? "Saving…" : state.text && !dirty ? state.text : dirty ? "You have unsaved changes." : content.updatedAt ? `Last saved ${new Date(content.updatedAt).toLocaleString("en-GB")}` : "No changes yet."}
          </p>
          <div className="flex gap-2">
            {dirty && <button type="button" className={`${btn} bg-blush text-choc`} onClick={() => { setContent(JSON.parse(saved)); setState({ kind: "idle" }) }}>Discard</button>}
            <button type="button" onClick={save} disabled={!dirty || state.kind === "saving"} className={`${btn} min-h-12 bg-rasp px-6 text-white hover:bg-rasp-deep`}>
              {state.kind === "saving" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Save &amp; publish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
