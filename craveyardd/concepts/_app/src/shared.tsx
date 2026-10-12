import { useEffect, useState, type ReactNode } from "react"
import * as Tabs from "@radix-ui/react-tabs"
import { Clock, Info, MapPin, Navigation } from "lucide-react"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { cn } from "@/lib/utils"

/* ---------- Content (read from craveyardd/data.js, loaded before the app) ---------- */
export type Item = { name: string; description: string; price?: number | string; image?: string; favourite?: number; tag?: string }
export type Category = { category: string; price?: number; tagline?: string; items?: Item[]; groups?: { title: string; options: string[] }[] }
export type SiteConfig = { instagram?: string; tiktokUrl?: string; email?: string; phone?: string; whatsapp?: string; formEndpoint?: string }
export type SiteText = {
  headline?: string; sub?: string; heroImage?: string; about?: string; eventsTitle?: string; events?: string; occasions?: string[]
  place?: string; address?: string; mapQuery?: string; hours?: string; hoursShort?: string; openHour?: number; closeHour?: number; allergen?: string
}
export type SiteData = { config: SiteConfig; site?: SiteText; menu: Category[]; gallery: string[] }

export const data: SiteData = (window as unknown as { CRAVEYARDD: SiteData }).CRAVEYARDD
// Path from the page to the craveyardd/ folder. Concept pages live two levels down; the main site sets window.CRAVEYARDD_ROOT = "./".
export const ROOT: string = (window as unknown as { CRAVEYARDD_ROOT?: string }).CRAVEYARDD_ROOT ?? "../../"

export const img = (src?: string) => (!src ? "" : /^(https?:)?\/\//.test(src) || src.startsWith("/") ? src : ROOT + src)
export const money = (p?: number | string) =>
  typeof p === "number" ? (p < 1 ? `${Math.round(p * 100)}p` : `£${p.toFixed(2)}`) : p ?? ""

export const favourites = data.menu
  .flatMap((c) => (c.items ?? []).map((it) => ({ ...it, category: c.category, price: it.price ?? c.price })))
  .filter((it) => it.favourite)
  .sort((a, b) => (a.favourite ?? 99) - (b.favourite ?? 99))
export const withPhotos = favourites.filter((f) => f.image)
export const fromPrice = Math.min(
  ...data.menu.flatMap((c) => [c.price, ...(c.items ?? []).map((i) => i.price)]).filter((p): p is number => typeof p === "number"),
)

const DEFAULT_TEXT = {
  headline: "Where Every Craving Meets Its Match",
  sub: "Fresh strawberries, warm waffles, indulgent cakes and chocolate-filled creations, made to satisfy every craving.",
  heroImage: "assets/photos/hero-strawberry-cup.webp",
  about:
    "CraveYardd is an independent Birmingham dessert brand created for people who take their cravings seriously. From fresh strawberries covered in luxurious chocolate to warm loaded waffles and irresistible cakes, every item is made to look amazing and taste even better.",
  eventsTitle: "Bring CraveYardd to Your Event",
  events:
    "Make your celebration sweeter with freshly prepared CraveYardd desserts. We offer flexible packages for private parties, corporate events and large celebrations across Birmingham.",
  occasions: ["Birthdays", "Weddings", "University events", "Corporate events", "Festivals", "Private parties", "Brand collaborations"],
  allergen: "Please speak to a member of our team if you have any allergies or dietary requirements.",
  place: "CraveYardd at Oba’s Kitchen, Lounge & Bar",
  address: "Bristol Road, Selly Oak, Birmingham",
  mapQuery: "Oba's Kitchen Lounge & Bar, Bristol Road, Selly Oak, Birmingham",
  hours: "Open daily: 2:00 PM–11:00 PM",
  hoursShort: "2–11 PM",
  openHour: 14,
  closeHour: 23,
}
// Saved content (from /admin) wins; anything left empty falls back to the defaults above.
const siteText = Object.fromEntries(Object.entries(data.site ?? {}).filter(([, v]) => v !== "" && v != null && !(Array.isArray(v) && !v.length)))
export const COPY = { ...DEFAULT_TEXT, ...siteText } as typeof DEFAULT_TEXT

const Q = encodeURIComponent(COPY.mapQuery)
export const LINKS = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${Q}`,
  map: `https://maps.google.com/maps?q=${Q}&z=16&output=embed`,
  instagram: `https://www.instagram.com/${data.config?.instagram || "crave.yardd"}/`,
  enquiry: `${ROOT}index.html#enquiry`,
  concepts: "../",
}

/* Instagram glyph (lucide no longer ships brand icons) */
export function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ---------- Official logo + logo intro (../splash.js) ---------- */
export function Logo({ className }: { className?: string }) {
  return <img src={ROOT + "assets/logo.webp"} alt="CraveYardd" width={93} height={46} className={cn("h-11 w-auto", className)} />
}

/** True once the shared logo intro starts closing, so hero animations play as the page is revealed. */
export function useSplashDone() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const splash = (window as unknown as { CraveSplash?: { done: Promise<void> } }).CraveSplash
    let alive = true
    ;(splash ? splash.done : Promise.resolve()).then(() => alive && setDone(true))
    return () => { alive = false }
  }, [])
  return done
}

/* ---------- Live open/closed status in UK time ---------- */
export function useOpenStatus() {
  const [label, setLabel] = useState({ open: false, text: `Open daily ${COPY.hoursShort}` })
  useEffect(() => {
    try {
      const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Europe/London" }).format(new Date()))
      const fmt = (x: number) => (x % 24 === 0 ? "midnight" : x === 12 ? "12 PM" : x > 12 ? `${x - 12} PM` : `${x} AM`)
      const open = h >= COPY.openHour && h < COPY.closeHour
      setLabel({ open, text: open ? `Open now · till ${fmt(COPY.closeHour)}` : h < COPY.openHour ? `Opens ${fmt(COPY.openHour)} today` : `Opens ${fmt(COPY.openHour)} tomorrow` })
    } catch {
      /* keep default */
    }
  }, [])
  return label
}

/* ---------- Photo with a graceful fallback ---------- */
export function Photo({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(!src)
  if (failed)
    return (
      <div className={cn("grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#fff,var(--color-baby))] text-sm font-semibold text-rasp-deep", className)} role="img" aria-label={`${alt} – photo coming soon`}>
        Photo coming soon
      </div>
    )
  return <img src={img(src)} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn("object-cover", className)} />
}

/* ---------- Menu tabs (Radix Tabs: arrow keys, roles and focus handled) ---------- */
export function MenuTabs({ tone = "light", itemClass, listClass }: { tone?: "light" | "dark"; itemClass?: string; listClass?: string }) {
  const dark = tone === "dark"
  return (
    <Tabs.Root defaultValue={data.menu[0].category}>
      <Tabs.List aria-label="Menu categories" className={cn("sticky top-16 z-20 -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:mx-0 md:px-0", listClass)}>
        {data.menu.map((c) => (
          <Tabs.Trigger
            key={c.category}
            value={c.category}
            className={cn(
              "min-h-12 flex-none rounded-full px-5 font-semibold transition-colors",
              dark ? "bg-white/10 text-cream data-[state=active]:bg-hot data-[state=active]:text-choc-dark" : "bg-white text-choc shadow-sm data-[state=active]:bg-choc data-[state=active]:text-white",
            )}
          >
            {c.category}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.menu.map((c) => (
        <Tabs.Content key={c.category} value={c.category} className="outline-none">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className={cn("font-medium", dark ? "text-cream/80" : "text-muted-ink")}>{c.tagline}</p>
            {typeof c.price === "number" && <span className="rounded-full bg-rasp px-4 py-1.5 font-semibold text-white">{money(c.price)} each</span>}
          </div>
          {!!c.items?.length && (
            <AnimatedGroup preset="blur-slide" className="grid gap-3 md:grid-cols-2 md:gap-4">
              {c.items.map((it) => (
                <article key={it.name} className={cn("grid grid-cols-[84px_1fr] items-center gap-4 rounded-3xl p-3", dark ? "bg-white/5" : "bg-white shadow-sm", itemClass)}>
                  <Photo src={it.image} alt="" className="size-[84px] rounded-2xl text-[11px]" />
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{it.name}</h3>
                    <p className={cn("mt-1 text-sm", dark ? "text-cream/75" : "text-muted-ink")}>{it.description}</p>
                    {it.price != null && <span className={cn("mt-1 block font-bold", dark ? "text-baby" : "text-rasp-deep")}>{money(it.price)}</span>}
                  </div>
                </article>
              ))}
            </AnimatedGroup>
          )}
          {c.groups?.map((g) => (
            <div key={g.title} className="mt-4">
              <h3 className={cn("mb-2 text-sm font-bold uppercase tracking-widest", dark ? "text-baby" : "text-rasp-deep")}>{g.title}</h3>
              <AnimatedGroup preset="scale" as="ul" className="m-0 flex list-none flex-wrap gap-2 p-0">
                {g.options.map((o) => (
                  <li key={o} className={cn("rounded-full border-2 px-4 py-2 font-semibold", dark ? "border-hot/60" : "border-baby bg-white")}>{o}</li>
                ))}
              </AnimatedGroup>
            </div>
          ))}
        </Tabs.Content>
      ))}
      <p role="note" className={cn("mt-6 flex items-start gap-3 rounded-2xl border-2 border-hot p-4 font-semibold", dark ? "text-cream" : "bg-white")}>
        <Info className="mt-0.5 size-5 flex-none text-hot" aria-hidden />
        {COPY.allergen}
      </p>
    </Tabs.Root>
  )
}

/* ---------- Find us ---------- */
export function Visit({ className, cardClass, children }: { className?: string; cardClass?: string; children?: ReactNode }) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-[.9fr_1.1fr]", className)}>
      <div className={cn("flex flex-col gap-4 rounded-[32px] p-6 md:p-10", cardClass)}>
        {children}
        <div className="flex items-start gap-3 font-semibold">
          <MapPin className="mt-0.5 size-5 flex-none text-rasp" aria-hidden />
          <div>{COPY.place}<span className="block font-normal opacity-80">{COPY.address}</span></div>
        </div>
        <div className="flex items-start gap-3 font-semibold">
          <Clock className="mt-0.5 size-5 flex-none text-rasp" aria-hidden />
          <div>{COPY.hours}</div>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <a href={LINKS.directions} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rasp px-6 font-bold text-white transition hover:bg-rasp-deep">
            <Navigation className="size-5" aria-hidden /> Get Directions
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-current px-6 font-bold">
            <Instagram className="size-5" /> @crave.yardd
          </a>
        </div>
      </div>
      <iframe title="Map of CraveYardd at Oba’s Kitchen, Lounge & Bar, Bristol Road, Selly Oak" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={LINKS.map} className="min-h-80 w-full rounded-[32px] border-0 bg-blush" />
    </div>
  )
}

export function Footer({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={cn("px-4 pb-28 pt-10 text-center text-sm lg:pb-10", dark ? "text-cream/75" : "text-muted-ink")}>
      <p className={cn("mb-2 font-semibold", dark ? "text-cream" : "text-foreground")}>{COPY.allergen}</p>
      <p>
        © 2026 CraveYardd. All rights reserved. · <a href={LINKS.concepts} className="underline underline-offset-4">All concepts</a>
      </p>
    </footer>
  )
}
