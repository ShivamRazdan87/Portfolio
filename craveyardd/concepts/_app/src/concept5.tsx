import { StrictMode, useLayoutEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { MotionConfig } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, CalendarHeart, Heart, Menu as MenuIcon, Navigation } from "lucide-react"
import "./styles.css"

import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"
import { WordRotate } from "@/components/ui/word-rotate"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Spotlight } from "@/components/ui/spotlight"
import { Magnetic } from "@/components/ui/magnetic"
import { Tilt } from "@/components/ui/tilt"
import { Button } from "@/components/ui/button"
import { COPY, data, Footer, fromPrice, img, Instagram, LINKS, Logo, MenuTabs, money, Photo, useOpenStatus, Visit, withPhotos } from "./shared"

gsap.registerPlugin(ScrollTrigger)

/*
 * Concept 5 – "Ultimate Craving": everything together.
 * UI UX Pro Max  -> structure and rules: Hero-Centric + Conversion, block-based clay cards,
 *                   Fredoka + Nunito, visible hours (live status), map, 48px targets,
 *                   sticky thumb-zone action bar, its GSAP "Stagger List" motion preset.
 * 21st.dev       -> Button + Marquee from the 21st.dev registry, plus Magic UI / Motion Primitives
 *                   components (shimmer button, border beam, word rotate, bento grid, spotlight, magnetic, tilt).
 * GSAP           -> ScrollTrigger reveals using that preset, hero parallax and a pinned favourites zoom.
 */

const clay = "shadow-[0_18px_34px_-16px_rgba(194,24,91,.35),inset_0_-6px_0_rgba(90,48,42,.06),inset_0_3px_0_rgba(255,255,255,.8)]"
const clayDark = "shadow-[0_18px_34px_-16px_rgba(42,21,18,.6),inset_0_-6px_0_rgba(0,0,0,.18),inset_0_3px_0_rgba(255,255,255,.12)]"
// UI UX Pro Max "Stagger List" preset (Standard tier)
const PRESET = { opacity: 0, scale: 0.92, y: 16, duration: 0.4, ease: "back.out(1.4)" }

function Header() {
  const status = useOpenStatus()
  return (
    <header className="sticky top-0 z-40 border-b border-choc/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="inline-flex min-h-12 items-center"><Logo /></a>
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {[["#menu", "Menu"], ["#about", "About Us"], ["#events", "Events"], ["#visit", "Find Us"]].map(([h, l]) => (
            <a key={h} href={h} className="flex min-h-11 items-center rounded-full px-4 font-bold hover:bg-blush">{l}</a>
          ))}
        </nav>
        <a href="#visit" className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold ${clay}`}>
          <span className={`size-2.5 rounded-full ${status.open ? "bg-green-600 ring-4 ring-green-600/20" : "bg-neutral-400"}`} aria-hidden />
          {status.text}
        </a>
      </div>
    </header>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero card enters as the shared logo intro closes.
        gsap.set(".hero-card", { opacity: 0, scale: 0.92, y: 16 })
        const splash = (window as unknown as { CraveSplash?: { done: Promise<void> } }).CraveSplash
        ;(splash ? splash.done : Promise.resolve()).then(() =>
          gsap.to(".hero-card", { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)", clearProps: "transform,opacity" }),
        )
        gsap.to(".hero-photo img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero-card", start: "top top", end: "bottom top", scrub: true } })

        // Preset stagger for every block group as it enters the screen.
        ;[".fact", ".bento-wrap > *", ".blocks > *", ".occ li"].forEach((sel) => {
          ScrollTrigger.batch(sel, {
            start: "top 90%", once: true,
            onEnter: (b) => gsap.from(b, { ...PRESET, stagger: { each: 0.06, grid: "auto" }, clearProps: "transform,opacity" }),
          })
        })

        // Favourites: the bento grid zooms up from slightly small while its section is pinned briefly.
        gsap.fromTo(".bento-wrap", { scale: 0.9, borderRadius: 48 }, {
          scale: 1, borderRadius: 0, ease: "none",
          scrollTrigger: { trigger: ".favs", start: "top 75%", end: "top 20%", scrub: true },
        })

        gsap.from(".visit-wrap", { ...PRESET, duration: 0.6, scrollTrigger: { trigger: ".visit-wrap", start: "top 85%", once: true } })
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => { window.removeEventListener("load", refresh); ctx.revert() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="absolute -top-16 left-3 z-50 rounded-xl bg-choc px-4 py-3 font-bold text-white focus:top-3">Skip to content</a>
      <div ref={root} className="min-h-screen overflow-x-clip bg-cream pb-[calc(76px+env(safe-area-inset-bottom))] font-nunito text-foreground lg:pb-0">
        <Header />
        <main id="main">
          {/* ---------- Hero-centric conversion block ---------- */}
          <section id="top" className="px-4 pt-4 md:px-8 md:pt-8" aria-labelledby="hero-h">
            <div className="mx-auto max-w-6xl">
              <div className={`hero-card relative grid overflow-hidden rounded-[36px] bg-rasp lg:min-h-[560px] lg:grid-cols-2 ${clay}`}>
                <div className="hero-photo relative aspect-[4/3.3] overflow-hidden lg:order-2 lg:aspect-auto">
                  <img src={img("assets/photos/hero-strawberry-cup.webp")} alt="CraveYardd Dubai Chocolate strawberry cup" width={1280} height={720} className="absolute inset-0 size-full scale-110 object-cover" />
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
                    <Button asChild size="lg" className={`min-h-13 rounded-full bg-choc px-7 text-base font-extrabold text-white hover:bg-choc-dark ${clayDark}`}>
                      <a href="#events">Book Us for an Event</a>
                    </Button>
                  </div>
                </div>
                <BorderBeam size={220} duration={10} colorFrom="#FFC9DF" colorTo="#FF3D8B" borderWidth={3} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {[[money(fromPrice), "Desserts from"], ["2–11 PM", "Open daily"], ["Selly Oak", "Bristol Road"]].map(([a, b]) => (
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

          {/* ---------- Favourites bento ---------- */}
          <section className="favs px-4 py-14 md:px-8 lg:py-20" aria-labelledby="fav-h">
            <div className="mx-auto max-w-6xl">
              <span className="text-xs font-extrabold uppercase tracking-[.14em] text-rasp-deep">Our favourites</span>
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

          {/* ---------- Menu tabs ---------- */}
          <section id="menu" className="bg-blush px-4 py-14 md:px-8 lg:py-20" aria-labelledby="menu-h">
            <div className="mx-auto max-w-6xl">
              <span className="text-xs font-extrabold uppercase tracking-[.14em] text-rasp-deep">Full menu</span>
              <h2 id="menu-h" className="mt-1 font-display text-4xl font-semibold text-choc md:text-5xl">Pick your craving</h2>
              <p className="mt-2 max-w-xl text-muted-ink">Chocolate strawberry cups, waffles in Birmingham and cakes worth the trip – make it yours with extra sauces and toppings.</p>
              <div className="mt-6"><MenuTabs listClass="bg-blush" itemClass={clay} /></div>
            </div>
          </section>

          {/* ---------- About + Events blocks ---------- */}
          <section className="px-4 py-14 md:px-8 lg:py-20" aria-label="About and events">
            <div className="blocks mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1.1fr_.9fr] lg:gap-4">
              <Tilt rotationFactor={4} isRevese>
                <div id="about" className={`h-full rounded-[32px] bg-white p-7 md:p-10 ${clay}`}>
                  <span className="text-xs font-extrabold uppercase tracking-[.14em] text-rasp-deep">About us</span>
                  <p className="mt-3 text-lg leading-relaxed md:text-xl">{COPY.about}</p>
                </div>
              </Tilt>
              <div id="events" className={`relative overflow-hidden rounded-[32px] bg-choc p-7 text-white md:p-10 ${clayDark}`}>
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
                      <a href={LINKS.enquiry} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-hot px-7 font-extrabold text-choc-dark hover:bg-baby">
                        <CalendarHeart className="size-5" aria-hidden /> Request a Quote <ArrowRight className="size-5" aria-hidden />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Visit (map always visible: UI UX Pro Max anti-pattern "No map") ---------- */}
          <section id="visit" className="px-4 pb-6 md:px-8" aria-labelledby="visit-h">
            <div className="visit-wrap mx-auto max-w-6xl">
              <Visit cardClass={`bg-baby text-choc ${clay}`}>
                <span className="text-xs font-extrabold uppercase tracking-[.14em] text-rasp-deep">Find us</span>
                <h2 id="visit-h" className="font-display text-4xl font-semibold">Desserts in Selly Oak</h2>
              </Visit>
            </div>
          </section>
        </main>
        <Footer />

        {/* ---------- Sticky thumb-zone action bar (mobile) ---------- */}
        <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 bg-white/95 px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_-18px_rgba(90,48,42,.5)] backdrop-blur-md lg:hidden">
          <a href="#menu" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[13px] font-extrabold text-choc"><MenuIcon className="size-5" aria-hidden />Menu</a>
          <a href={LINKS.directions} target="_blank" rel="noopener" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl bg-rasp text-[13px] font-extrabold text-white"><Navigation className="size-5" aria-hidden />Directions</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[13px] font-extrabold text-choc"><Instagram className="size-5" />Instagram</a>
        </nav>
      </div>
    </MotionConfig>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)
