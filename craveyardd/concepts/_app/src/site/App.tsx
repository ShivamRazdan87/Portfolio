import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react"
import { MotionConfig } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, CalendarHeart, Heart, Mail, Menu as MenuIcon, Navigation, Phone, Send, X } from "lucide-react"

import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"
import { WordRotate } from "@/components/ui/word-rotate"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Spotlight } from "@/components/ui/spotlight"
import { Magnetic } from "@/components/ui/magnetic"
import { Tilt } from "@/components/ui/tilt"
import { Button } from "@/components/ui/button"
import { COPY, data, fromPrice, img, Instagram, LINKS, Logo, MenuTabs, money, Photo, ROOT, useOpenStatus, Visit, withPhotos } from "../shared"

gsap.registerPlugin(ScrollTrigger)

/*
 * CraveYardd website – based on Concept 5 "Ultimate Craving".
 * UI UX Pro Max  -> Hero-Centric + Conversion layout, clay blocks, Fredoka + Nunito, live opening status,
 *                   map, 48px targets, sticky thumb-zone action bar, its GSAP "Stagger List" preset.
 * 21st.dev       -> Button + Marquee from the 21st.dev registry, plus Magic UI / Motion Primitives components.
 * GSAP           -> ScrollTrigger reveals, hero parallax and the favourites zoom.
 * Content (menu, prices, photos, contact details) comes from craveyardd/data.js.
 */

const clay = "shadow-[0_18px_34px_-16px_rgba(194,24,91,.35),inset_0_-6px_0_rgba(90,48,42,.06),inset_0_3px_0_rgba(255,255,255,.8)]"
const clayDark = "shadow-[0_18px_34px_-16px_rgba(42,21,18,.6),inset_0_-6px_0_rgba(0,0,0,.18),inset_0_3px_0_rgba(255,255,255,.12)]"
const PRESET = { opacity: 0, scale: 0.92, y: 16, duration: 0.4, ease: "back.out(1.4)" }
const eyebrow = "text-xs font-extrabold uppercase tracking-[.14em] text-rasp-deep"

const NAV = [["#top", "Home"], ["#menu", "Menu"], ["#about", "About Us"], ["#events", "Events"], ["#visit", "Find Us"], ["#contact", "Contact"]]
const cfg = data.config ?? {}
const handle = cfg.instagram || "crave.yardd"

function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.8 2.3 4.6 5 4.8" />
    </svg>
  )
}
function WhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M8.7 7.8c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.6l-.6.7c-.1.2-.2.3 0 .6.6 1 1.5 1.9 2.6 2.4.3.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.4 0 .3 0 1.2-.7 1.8-.6.6-1.6.8-2.9.4a9.4 9.4 0 0 1-4.7-4.2c-.8-1.4-.6-2.6-.2-3.1z" fill="currentColor" />
    </svg>
  )
}

/* ---------- Header with desktop nav and mobile menu ---------- */
function Header() {
  const status = useOpenStatus()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-choc/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="inline-flex min-h-12 items-center" aria-label="CraveYardd – home"><Logo /></a>
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} className="flex min-h-11 items-center rounded-full px-4 font-bold hover:bg-blush">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#visit" className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold ${clay}`}>
            <span className={`size-2.5 rounded-full ${status.open ? "bg-green-600 ring-4 ring-green-600/20" : "bg-neutral-400"}`} aria-hidden />
            {status.text}
          </a>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full bg-blush text-choc lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden /> : <MenuIcon className="size-6" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-choc/10 bg-cream px-4 pb-4 shadow-lg lg:hidden">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-choc/10 font-display text-xl font-semibold text-choc last:border-0">
              {l}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

/* ---------- Event enquiry form ---------- */
function EnquiryForm() {
  const [status, setStatus] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [invalid, setInvalid] = useState<Record<string, boolean>>({})
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  const productOptions = data.menu.filter((c) => c.items?.length).map((c) => c.category)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const get = (k: string) => String(fd.get(k) ?? "").trim()
    const bad: Record<string, boolean> = {
      name: !get("name"),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email")),
      date: !get("date"),
      location: !get("location"),
    }
    setInvalid(bad)
    const first = Object.keys(bad).find((k) => bad[k])
    if (first) {
      setStatus({ kind: "err", text: "Please fill in the highlighted fields." })
      ;(form.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }
    const products = fd.getAll("products").join(", ") || "Not specified"
    const lines = [
      `Full name: ${get("name")}`, `Email: ${get("email")}`, `Phone: ${get("phone") || "-"}`,
      `Event date: ${get("date")}`, `Event location: ${get("location")}`, `Number of guests: ${get("guests") || "-"}`,
      `Products required: ${products}`, "", "Additional information:", get("info") || "-",
    ]
    if (cfg.formEndpoint) {
      fd.set("products", products)
      setSending(true)
      setStatus({ kind: "info", text: "Sending…" })
      try {
        const r = await fetch(cfg.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        if (!r.ok) throw new Error(String(r.status))
        form.reset()
        setStatus({ kind: "ok", text: "Thank you! Your enquiry has been sent – we’ll be in touch soon." })
      } catch {
        setStatus({ kind: "err", text: `Sorry, something went wrong. Please message us on Instagram @${handle}.` })
      } finally {
        setSending(false)
      }
    } else if (cfg.email) {
      window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(`Event enquiry – ${get("date")}`)}&body=${encodeURIComponent(lines.join("\n"))}`
      setStatus({ kind: "ok", text: "Your email app should open with the enquiry ready to send." })
    } else {
      setStatus({ kind: "info", text: `Online enquiries are launching soon. For now, please send your event details by DM on Instagram @${handle}.` })
    }
  }

  const field = (name: string) =>
    `w-full min-h-13 rounded-2xl border-2 bg-white px-4 text-base outline-none transition focus:border-rasp focus:ring-4 focus:ring-hot/25 ${invalid[name] ? "border-rasp" : "border-choc/10"}`
  const label = "mb-1.5 block text-sm font-extrabold text-choc"
  const req = <span className="text-rasp" aria-hidden> *</span>

  return (
    <form id="enquiry" noValidate onSubmit={onSubmit} aria-labelledby="enquiry-h" className={`enquiry-card grid scroll-mt-24 gap-4 rounded-[32px] bg-white p-6 md:grid-cols-2 md:p-10 ${clay}`}>
      <div className="md:col-span-2">
        <span className={eyebrow}>Event enquiry</span>
        <h3 id="enquiry-h" className="mt-1 font-display text-3xl font-semibold text-choc">Request a quote</h3>
        <p className="mt-1 text-muted-ink">Tell us about your celebration and we’ll get back to you with a package.</p>
      </div>
      <div><label htmlFor="f-name" className={label}>Full name{req}</label><input id="f-name" name="name" autoComplete="name" required aria-invalid={!!invalid.name} className={field("name")} /></div>
      <div><label htmlFor="f-email" className={label}>Email{req}</label><input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={!!invalid.email} className={field("email")} /></div>
      <div><label htmlFor="f-phone" className={label}>Phone number</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field("phone")} /></div>
      <div><label htmlFor="f-date" className={label}>Event date{req}</label><input id="f-date" name="date" type="date" min={today} required aria-invalid={!!invalid.date} className={field("date")} /></div>
      <div><label htmlFor="f-location" className={label}>Event location{req}</label><input id="f-location" name="location" required aria-invalid={!!invalid.location} className={field("location")} /></div>
      <div><label htmlFor="f-guests" className={label}>Number of guests</label><input id="f-guests" name="guests" type="number" min={1} inputMode="numeric" className={field("guests")} /></div>
      <fieldset className="m-0 min-w-0 border-0 p-0 md:col-span-2">
        <legend className={label}>Products required</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {productOptions.map((p) => (
            <label key={p} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 border-choc/10 bg-blush/60 px-4 font-bold has-[:checked]:border-rasp has-[:checked]:bg-baby">
              <input type="checkbox" name="products" value={p} className="size-5 accent-rasp" /> {p}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2"><label htmlFor="f-info" className={label}>Additional information</label><textarea id="f-info" name="info" rows={4} placeholder="Theme, timings, dietary needs or anything else we should know." className={`${field("info")} py-3`} /></div>
      <div className="md:col-span-2">
        <button type="submit" disabled={sending} className={`inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-rasp px-8 text-lg font-extrabold text-white transition hover:bg-rasp-deep disabled:opacity-60 md:w-auto`}>
          <Send className="size-5" aria-hidden /> Request a Quote
        </button>
        <p role="status" aria-live="polite" className={`mt-3 min-h-6 font-bold ${status?.kind === "err" ? "text-rasp" : status?.kind === "ok" ? "text-green-700" : "text-choc"}`}>
          {status?.text}
          {status?.kind === "info" && !cfg.formEndpoint && !cfg.email && (
            <> <a href={LINKS.instagram} target="_blank" rel="noopener" className="underline underline-offset-4">Open Instagram</a></>
          )}
        </p>
      </div>
    </form>
  )
}

/* ---------- Follow the Cravings ---------- */
function Social() {
  const photos = data.gallery.filter(Boolean).slice(0, 6)
  return (
    <section id="social" className="bg-[radial-gradient(circle_at_15%_0%,rgba(255,61,139,.16),transparent_45%),linear-gradient(180deg,var(--color-blush),var(--color-baby))] px-4 py-14 md:px-8 lg:py-20" aria-labelledby="social-h">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className={eyebrow}>Instagram &amp; TikTok</span>
          <h2 id="social-h" className="mt-1 font-display text-4xl font-semibold text-choc md:text-5xl">Follow the Cravings</h2>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-11 items-center border-b-[3px] border-hot font-display text-2xl font-semibold text-rasp">@{handle}</a>
        </div>
        <div className="social-grid mt-8 grid grid-cols-3 gap-2 md:gap-4">
          {photos.map((p, i) => (
            <a key={p} href={LINKS.instagram} target="_blank" rel="noopener" aria-label={`CraveYardd on Instagram, photo ${i + 1}`} className="group block overflow-hidden rounded-2xl md:rounded-[24px]">
              <img src={img(p)} alt="" loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" />
            </a>
          ))}
        </div>
        <div className="social-grid mt-6 grid gap-4 md:grid-cols-2">
          <div className={`flex items-center gap-5 rounded-[28px] bg-white p-5 ${clay}`}>
            <img src={`${ROOT}assets/qr-instagram.svg`} alt="QR code linking to CraveYardd on Instagram" width={112} height={112} className="size-28 flex-none rounded-2xl bg-cream p-2" />
            <div>
              <h3 className="font-display text-2xl font-semibold text-choc">Instagram</h3>
              <p className="mb-3 text-sm text-muted-ink">Scan or tap to see what’s fresh today.</p>
              <a href={LINKS.instagram} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-choc px-5 font-extrabold text-white hover:bg-choc-dark"><Instagram className="size-5" /> Follow @{handle}</a>
            </div>
          </div>
          <div className={`flex items-center gap-5 rounded-[28px] bg-white p-5 ${clay}`}>
            <div className="grid size-28 flex-none place-items-center rounded-2xl border-2 border-dashed border-hot bg-blush p-3 text-center text-xs font-bold text-muted-ink">
              {cfg.tiktokUrl ? <TikTok className="size-12 text-choc" /> : "TikTok QR code coming soon"}
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-choc">TikTok</h3>
              <p className="mb-3 text-sm text-muted-ink">Watch the drizzle, the crunch and the cravings.</p>
              {cfg.tiktokUrl ? (
                <a href={cfg.tiktokUrl} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-choc px-5 font-extrabold text-white hover:bg-choc-dark"><TikTok className="size-5" /> Follow on TikTok</a>
              ) : (
                <span className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-choc/20 px-5 font-extrabold text-muted-ink"><TikTok className="size-5" /> TikTok coming soon</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */
function Contact() {
  const items = [
    { Icon: Instagram, label: "Instagram", value: `@${handle}`, href: LINKS.instagram, ext: true },
    { Icon: TikTok, label: "TikTok", value: cfg.tiktokUrl ? "Follow us on TikTok" : "Link coming soon", href: cfg.tiktokUrl, ext: true },
    { Icon: Mail, label: "Email", value: cfg.email || "Email coming soon", href: cfg.email ? `mailto:${cfg.email}` : "" },
    { Icon: Phone, label: "Phone / WhatsApp", value: cfg.phone || "Number coming soon", href: cfg.phone ? `tel:${cfg.phone.replace(/\s+/g, "")}` : "" },
  ]
  return (
    <section id="contact" className="px-4 py-14 md:px-8 lg:py-20" aria-labelledby="contact-h">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className={eyebrow}>Contact</span>
          <h2 id="contact-h" className="mt-1 font-display text-4xl font-semibold text-choc md:text-5xl">Say hello</h2>
          <p className="mt-2 text-muted-ink">Questions, collaborations or dessert catering in Birmingham – we’d love to hear from you.</p>
        </div>
        <div className="contact-list mt-8 grid gap-3 md:grid-cols-2">
          {items.map(({ Icon, label, value, href, ext }) => {
            const inner = (
              <>
                <span className="grid size-12 flex-none place-items-center rounded-2xl bg-baby text-rasp"><Icon className="size-5" /></span>
                <span>
                  <small className="block text-xs font-extrabold uppercase tracking-widest text-muted-ink">{label}</small>
                  <b className={href ? "text-choc" : "font-semibold text-muted-ink"}>{value}</b>
                </span>
              </>
            )
            const cls = `flex min-h-20 items-center gap-4 rounded-3xl bg-white p-4 ${clay}`
            return href ? (
              <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})} className={`${cls} transition hover:-translate-y-0.5`}>{inner}</a>
            ) : (
              <div key={label} className={cls}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return (
    <footer className="bg-choc px-4 pb-28 pt-12 text-cream md:px-8 lg:pb-10">
      <div className="mx-auto grid max-w-6xl justify-items-center gap-8 text-center lg:grid-cols-[auto_1fr_auto] lg:items-center lg:justify-items-start lg:text-left">
        <a href="#top" aria-label="CraveYardd – back to top"><img src={`${ROOT}assets/logo.webp`} alt="CraveYardd" width={170} height={84} loading="lazy" className="h-20 w-auto" /></a>
        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-2 gap-y-1 p-0 lg:justify-start">
            {NAV.map(([h, l]) => (
              <li key={h}><a href={h} className="flex min-h-11 items-center px-2.5 opacity-90 hover:underline hover:underline-offset-4 hover:opacity-100">{l}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2.5">
          <a href={LINKS.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-hot hover:text-white"><Instagram className="size-5" /></a>
          {cfg.tiktokUrl && <a href={cfg.tiktokUrl} target="_blank" rel="noopener" aria-label="TikTok" className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-hot hover:text-white"><TikTok className="size-5" /></a>}
          {cfg.email && <a href={`mailto:${cfg.email}`} aria-label="Email" className="grid size-12 place-items-center rounded-full bg-white/10 transition hover:bg-hot hover:text-white"><Mail className="size-5" aria-hidden /></a>}
        </div>
      </div>
      <div className="mx-auto mt-9 max-w-6xl border-t border-white/15 pt-6 text-center text-sm">
        <p className="font-semibold">{COPY.allergen}</p>
        <p className="mt-2 text-cream/70">© 2026 CraveYardd. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ---------- Page ---------- */
export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const whatsapp = cfg.whatsapp && /^\d{8,15}$/.test(cfg.whatsapp) ? cfg.whatsapp : ""

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero card enters as the logo intro closes.
        gsap.set(".hero-card", { opacity: 0, scale: 0.92, y: 16 })
        const splash = (window as unknown as { CraveSplash?: { done: Promise<void> } }).CraveSplash
        ;(splash ? splash.done : Promise.resolve()).then(() =>
          gsap.to(".hero-card", { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)", clearProps: "transform,opacity" }),
        )
        gsap.to(".hero-photo img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero-card", start: "top top", end: "bottom top", scrub: true } })

        // UI UX Pro Max stagger preset for every block group as it enters the screen.
        ;[".fact", ".bento-wrap > *", ".blocks > *", ".occ li", ".social-grid > *", ".contact-list > *"].forEach((sel) => {
          ScrollTrigger.batch(sel, {
            start: "top 90%", once: true,
            onEnter: (b) => gsap.from(b, { ...PRESET, stagger: { each: 0.06, grid: "auto" }, clearProps: "transform,opacity" }),
          })
        })
        gsap.fromTo(".bento-wrap", { scale: 0.9, borderRadius: 48 }, {
          scale: 1, borderRadius: 0, ease: "none",
          scrollTrigger: { trigger: ".favs", start: "top 75%", end: "top 20%", scrub: true },
        })
        ;[".enquiry-card", ".visit-wrap"].forEach((sel) =>
          gsap.from(sel, { ...PRESET, duration: 0.6, clearProps: "transform,opacity", scrollTrigger: { trigger: sel, start: "top 85%", once: true } }),
        )
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => { window.removeEventListener("load", refresh); ctx.revert() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="absolute -top-16 left-3 z-50 rounded-xl bg-choc px-4 py-3 font-bold text-white focus:top-3">Skip to content</a>
      <div ref={root} className="min-h-screen overflow-x-clip bg-cream font-nunito text-foreground">
        <Header />
        <main id="main">
          {/* ---------- Hero ---------- */}
          <section id="top" className="scroll-mt-20 px-4 pt-4 md:px-8 md:pt-8" aria-labelledby="hero-h">
            <div className="mx-auto max-w-6xl">
              <div className={`hero-card relative grid overflow-hidden rounded-[36px] bg-rasp lg:min-h-[560px] lg:grid-cols-2 ${clay}`}>
                <div className="hero-photo relative aspect-[4/3.3] overflow-hidden lg:order-2 lg:aspect-auto">
                  <img src={img(COPY.heroImage)} alt="CraveYardd dessert" width={1280} height={720} fetchPriority="high" className="absolute inset-0 size-full scale-110 object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 text-white md:p-12">
                  <span className="text-xs font-extrabold uppercase tracking-[.14em] text-baby">Birmingham dessert cart · Selly Oak</span>
                  <h1 id="hero-h" className="mt-2 font-display text-[40px] font-bold leading-[1.04] md:text-6xl">{COPY.headline}</h1>
                  <p className="mt-3 text-lg text-white/90">{COPY.sub}</p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2 font-display text-xl font-semibold">
                    <span className="text-baby">Craving</span>
                    <WordRotate className="text-white" words={["Dubai Chocolate?", "a Loaded Waffle?", "Matilda Cake?", "Biscoff Crunch?"]} />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#menu">
                      <ShimmerButton background="#FFFFFF" shimmerColor="#FF3D8B" className="min-h-13 px-7 font-extrabold text-choc">
                        <MenuIcon className="mr-2 size-5" aria-hidden /> View Our Menu
                      </ShimmerButton>
                    </a>
                    <Button asChild size="lg" className={`min-h-13 rounded-full bg-white/15 px-7 text-base font-extrabold text-white ring-2 ring-white/70 hover:bg-white/25`}>
                      <a href="#visit">Find Us</a>
                    </Button>
                    <Button asChild size="lg" className={`min-h-13 rounded-full bg-choc px-7 text-base font-extrabold text-white hover:bg-choc-dark ${clayDark}`}>
                      <a href="#events">Book Us for an Event</a>
                    </Button>
                  </div>
                </div>
                <BorderBeam size={220} duration={10} colorFrom="#FFC9DF" colorTo="#FF3D8B" borderWidth={3} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[[money(fromPrice), "Desserts from"], [COPY.hoursShort, "Open daily"], ["Selly Oak", COPY.address.split(",")[0]]].map(([a, b]) => (
                  <div key={b} className={`fact rounded-[22px] bg-white px-3 py-3.5 text-center ${clay}`}>
                    <strong className="block font-display text-lg font-semibold text-rasp md:text-2xl">{a}</strong>
                    <span className="text-[13px] font-bold text-muted-ink">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Photo marquee (21st.dev) ---------- */}
          <div className="mt-10" aria-hidden>
            <Marquee pauseOnHover className="[--duration:40s] [--gap:.875rem]">
              {data.gallery.filter(Boolean).map((p) => <img key={p} src={img(p)} alt="" loading="lazy" className="h-36 w-52 rounded-3xl object-cover md:h-48 md:w-72" />)}
            </Marquee>
          </div>

          {/* ---------- Favourites ---------- */}
          <section className="favs px-4 py-14 md:px-8 lg:py-20" aria-labelledby="fav-h">
            <div className="mx-auto max-w-6xl">
              <span className={eyebrow}>Our favourites</span>
              <h2 id="fav-h" className="mt-1 font-display text-4xl font-semibold text-choc md:text-5xl">Most craved right now</h2>
              <div className="bento-wrap mt-6 overflow-hidden">
                <BentoGrid className="auto-rows-[17rem] grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                  {withPhotos.slice(0, 5).map((f, i) => (
                    <BentoCard
                      key={f.name}
                      name={f.name}
                      description={`${f.category} · ${money(f.price)}`}
                      Icon={Heart}
                      href="#menu"
                      cta="Find it on the menu"
                      className={`col-span-1 rounded-[28px] bg-white ${clay} ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                      background={<Photo src={f.image} alt={f.name} className="absolute inset-0 size-full transition duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_top,transparent_32%,#000_72%)]" />}
                    />
                  ))}
                </BentoGrid>
              </div>
            </div>
          </section>

          {/* ---------- Menu ---------- */}
          <section id="menu" className="bg-blush px-4 py-14 md:px-8 lg:py-20" aria-labelledby="menu-h">
            <div className="mx-auto max-w-6xl">
              <span className={eyebrow}>Full menu</span>
              <h2 id="menu-h" className="mt-1 font-display text-4xl font-semibold text-choc md:text-5xl">Pick your craving</h2>
              <p className="mt-2 max-w-xl text-muted-ink">Chocolate strawberry cups, waffles in Birmingham and cakes worth the trip – make it yours with extra sauces and toppings.</p>
              <div className="mt-6"><MenuTabs listClass="bg-blush" itemClass={clay} /></div>
            </div>
          </section>

          {/* ---------- About + Events ---------- */}
          <section className="px-4 py-14 md:px-8 lg:py-20" aria-label="About and events">
            <div className="blocks mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1.1fr_.9fr] lg:gap-4">
              <Tilt rotationFactor={4} isRevese>
                <div id="about" className={`h-full scroll-mt-24 rounded-[32px] bg-white p-7 md:p-10 ${clay}`}>
                  <span className={eyebrow}>About us</span>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-choc md:text-4xl">Made for serious cravings</h2>
                  <p className="mt-3 text-lg leading-relaxed md:text-xl">{COPY.about}</p>
                </div>
              </Tilt>
              <div id="events" className={`relative scroll-mt-24 overflow-hidden rounded-[32px] bg-choc p-7 text-white md:p-10 ${clayDark}`}>
                <Spotlight className="from-hot via-rasp to-baby blur-2xl" size={240} />
                <div className="relative">
                  <span className="text-xs font-extrabold uppercase tracking-[.14em] text-baby">Dessert catering Birmingham</span>
                  <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{COPY.eventsTitle}</h2>
                  <p className="mt-3 text-white/85">{COPY.events}</p>
                  <ul className="occ mt-5 flex list-none flex-wrap gap-2 p-0">
                    {COPY.occasions.map((o) => <li key={o} className="rounded-full border-2 border-baby/55 px-3.5 py-1.5 text-sm font-bold">{o}</li>)}
                  </ul>
                  <div className="mt-6">
                    <Magnetic intensity={0.25} range={120}>
                      <a href="#enquiry" className="inline-flex min-h-13 items-center gap-2 rounded-full bg-hot px-7 font-extrabold text-choc-dark hover:bg-baby">
                        <CalendarHeart className="size-5" aria-hidden /> Request a Quote <ArrowRight className="size-5" aria-hidden />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-4 max-w-6xl"><EnquiryForm /></div>
          </section>

          {/* ---------- Find us ---------- */}
          <section id="visit" className="scroll-mt-20 px-4 pb-14 md:px-8 lg:pb-20" aria-labelledby="visit-h">
            <div className="visit-wrap mx-auto max-w-6xl">
              <Visit cardClass={`bg-baby text-choc ${clay}`}>
                <span className={eyebrow}>Find us</span>
                <h2 id="visit-h" className="font-display text-4xl font-semibold">Desserts in Selly Oak</h2>
              </Visit>
            </div>
          </section>

          <Social />
          <Contact />
        </main>
        <SiteFooter />

        {/* ---------- Sticky thumb-zone action bar (mobile) ---------- */}
        <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 bg-white/95 px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_-18px_rgba(90,48,42,.5)] backdrop-blur-md lg:hidden">
          <a href="#menu" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[13px] font-extrabold text-choc"><MenuIcon className="size-5" aria-hidden />Menu</a>
          <a href={LINKS.directions} target="_blank" rel="noopener" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-rasp text-[13px] font-extrabold text-white"><Navigation className="size-5" aria-hidden />Directions</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[13px] font-extrabold text-choc"><Instagram className="size-5" />Instagram</a>
        </nav>

        {/* Floating WhatsApp button – only once the business number is set in data.js */}
        {whatsapp && (
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener" aria-label="Message CraveYardd on WhatsApp"
             className="fixed bottom-[calc(88px+env(safe-area-inset-bottom))] right-4 z-50 grid size-15 place-items-center rounded-full bg-[#1F9E55] text-white shadow-xl transition hover:scale-105 lg:bottom-6">
            <WhatsApp className="size-8" />
          </a>
        )}
      </div>
    </MotionConfig>
  )
}
