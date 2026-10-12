import { StrictMode, useLayoutEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { MotionConfig } from "motion/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, CalendarHeart } from "lucide-react"
import "./styles.css"

import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { TextEffect } from "@/components/ui/text-effect"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { Spotlight } from "@/components/ui/spotlight"
import { Magnetic } from "@/components/ui/magnetic"
import { Button } from "@/components/ui/button"
import { RotatingBadge } from "@/components/RotatingBadge"
import { COPY, data, Footer, img, LINKS, Logo, money, Photo, useOpenStatus, useSplashDone, Visit, withPhotos } from "./shared"

gsap.registerPlugin(ScrollTrigger)

/*
 * Concept 3 – "Scroll Sundae"
 * GSAP + ScrollTrigger drive the scroll choreography (cup fan-out, pinned horizontal menu,
 * chocolate text fill, parallax). 21st.dev / Magic UI / Motion Primitives components
 * provide the interface pieces (marquee, shimmer buttons, text effect, slider, spotlight, magnetic).
 */

const STACK = ["assets/photos/dubai-chocolate-cup.webp", "assets/photos/biscoff-crunch-cup.webp", "assets/photos/classic-chocolate-cup.webp"]

function Header() {
  const status = useOpenStatus()
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-choc-dark/85 text-cream backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="inline-flex min-h-12 items-center"><Logo /></a>
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {[["#menu", "Menu"], ["#about", "About Us"], ["#events", "Events"], ["#visit", "Find Us"]].map(([h, l]) => (
            <a key={h} href={h} className="flex min-h-11 items-center rounded-full px-4 font-medium hover:bg-white/10">{l}</a>
          ))}
        </nav>
        <a href="#visit" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold">
          <span className={`size-2.5 rounded-full ${status.open ? "bg-green-500" : "bg-neutral-400"}`} aria-hidden />
          {status.text}
        </a>
      </div>
    </header>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const ready = useSplashDone()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (c) => {
        const { motion, desktop } = c.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        // Hero: the stacked cups fan out and the headline drifts as you scroll.
        const fan = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "+=90%", scrub: 1, pin: true } })
        fan.to(".stack-0", { xPercent: desktop ? -62 : -38, rotate: -12, ease: "none" }, 0)
           .to(".stack-2", { xPercent: desktop ? 62 : 38, rotate: 12, ease: "none" }, 0)
           .to(".stack-1", { scale: 1.08, ease: "none" }, 0)
           .to(".hero-copy", { yPercent: -18, opacity: 0.35, ease: "none" }, 0)

        // Menu: pinned horizontal ride through the categories (desktop); stacked reveals on mobile.
        const track = document.querySelector<HTMLElement>(".menu-track")!
        if (desktop) {
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: { trigger: ".menu", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
          })
        } else {
          gsap.utils.toArray<HTMLElement>(".menu-panel").forEach((p) =>
            gsap.from(p, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 88%", once: true } }),
          )
        }

        // Section titles rise in.
        gsap.utils.toArray<HTMLElement>(".rise").forEach((el) =>
          gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        )

        // About: chocolate colour fills the text as you scroll through it.
        gsap.fromTo(".fill-text", { backgroundSize: "0% 100%" }, {
          backgroundSize: "100% 100%", ease: "none",
          scrollTrigger: { trigger: ".fill-text", start: "top 80%", end: "bottom 50%", scrub: true },
        })

        // Favourites slider drifts sideways with scroll for extra depth.
        gsap.to(".fav-slider", { xPercent: -8, ease: "none", scrollTrigger: { trigger: ".favs", start: "top bottom", end: "bottom top", scrub: true } })

        // Events: occasions pop like sprinkles.
        gsap.from(".occ li", {
          scale: 0.5, opacity: 0, rotate: () => gsap.utils.random(-15, 15), duration: 0.6, ease: "back.out(2.2)", stagger: 0.06,
          scrollTrigger: { trigger: ".occ", start: "top 90%", once: true },
        })
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    return () => { window.removeEventListener("load", refresh); ctx.revert() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="absolute -top-16 left-3 z-50 rounded-xl bg-hot px-4 py-3 font-semibold text-choc-dark focus:top-3">Skip to content</a>
      <div ref={root} className="min-h-screen overflow-x-clip bg-cream font-sans text-foreground">
        <Header />
        <main id="main">
          {/* ---------- Hero ---------- */}
          <section id="top" className="hero relative flex min-h-svh items-center overflow-hidden bg-choc-dark px-4 pt-16 text-cream md:px-8">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 py-10 lg:grid-cols-2">
              <div className="hero-copy relative z-10">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-baby">Birmingham dessert cart · Selly Oak</span>
                <TextEffect as="h1" per="char" preset="blur" speedReveal={1.6} trigger={ready} className="mt-4 font-display text-5xl font-bold leading-[1.02] md:text-7xl">
                  {COPY.headline}
                </TextEffect>
                <p className="mt-5 max-w-lg text-lg text-cream/85">{COPY.sub}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#menu">
                    <ShimmerButton background="#FF3D8B" shimmerColor="#FFFFFF" className="min-h-13 px-7 font-semibold text-choc-dark">
                      View Our Menu <ArrowRight className="ml-2 size-5" aria-hidden />
                    </ShimmerButton>
                  </a>
                  <Button asChild variant="outline" size="lg" className="min-h-13 rounded-full border-2 border-cream bg-transparent px-7 text-base font-semibold text-cream hover:bg-cream hover:text-choc-dark">
                    <a href="#events">Book Us for an Event</a>
                  </Button>
                </div>
                <RotatingBadge text="Scroll to crave ✦ CraveYardd ✦ Selly Oak ✦ " center="CY" color="#FFC9DF" size={150} className="mt-10 font-display" />
              </div>
              <div className="relative mx-auto h-[360px] w-full max-w-[520px] md:h-[460px]" aria-label="Three CraveYardd cups" role="img">
                {STACK.map((src, i) => (
                  <img key={src} src={img(src)} alt="" className={`stack-${i} absolute left-1/2 top-1/2 h-[300px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border-4 border-cream object-cover shadow-2xl md:h-[400px] md:w-[280px] ${i === 1 ? "z-10" : ""}`} />
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Marquee band (21st.dev) ---------- */}
          <div className="bg-hot py-4 text-choc-dark" aria-hidden>
            <Marquee className="[--duration:28s] [--gap:2.5rem]">
              {data.menu.flatMap((c) => (c.items ?? []).map((i) => i.name)).map((n) => (
                <span key={n} className="font-display text-2xl font-bold md:text-3xl">{n} ✦</span>
              ))}
            </Marquee>
          </div>

          {/* ---------- Menu: pinned horizontal panels ---------- */}
          <section id="menu" className="menu relative overflow-hidden bg-cream py-20 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-0 lg:pt-16" aria-labelledby="menu-h">
            <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
              <span className="text-xs font-bold uppercase tracking-[.16em] text-rasp-deep">Full menu</span>
              <h2 id="menu-h" className="mt-2 font-display text-4xl font-semibold text-choc md:text-6xl">Scroll the menu</h2>
            </div>
            <div className="menu-track mt-8 flex flex-col gap-5 px-4 md:px-8 lg:w-max lg:flex-row lg:gap-8">
              {data.menu.map((c) => (
                <article key={c.category} className="menu-panel flex w-full flex-col rounded-[32px] bg-white p-6 shadow-[0_20px_40px_-24px_rgba(90,48,42,.4)] lg:h-[64svh] lg:w-[560px] lg:overflow-y-auto">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-3xl font-semibold text-choc">{c.category}</h3>
                    {typeof c.price === "number" && <span className="rounded-full bg-rasp px-4 py-1.5 font-semibold text-white">{money(c.price)} each</span>}
                  </div>
                  <p className="mt-1 text-muted-ink">{c.tagline}</p>
                  <div className="mt-4 grid gap-3">
                    {(c.items ?? []).map((it) => (
                      <div key={it.name} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-dashed border-choc/15 pb-3 last:border-0">
                        <Photo src={it.image} alt="" className="size-16 rounded-2xl text-[10px]" />
                        <div><b className="block leading-tight">{it.name}</b><span className="text-sm text-muted-ink">{it.description}</span></div>
                        {it.price != null && <span className="font-bold text-rasp-deep">{money(it.price)}</span>}
                      </div>
                    ))}
                    {c.groups?.map((g) => (
                      <div key={g.title}>
                        <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-rasp-deep">{g.title}</h4>
                        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                          {g.options.map((o) => <li key={o} className="rounded-full border-2 border-baby bg-blush px-4 py-2 font-semibold">{o}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p role="note" className="mx-auto mt-6 w-full max-w-6xl px-4 font-semibold text-choc md:px-8">{COPY.allergen}</p>
          </section>

          {/* ---------- Favourites slider ---------- */}
          <section className="favs overflow-hidden bg-baby py-20" aria-labelledby="fav-h">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
              <h2 id="fav-h" className="rise font-display text-4xl font-semibold text-choc md:text-6xl">Most craved</h2>
            </div>
            <div className="fav-slider mt-8">
              <InfiniteSlider gap={20} speed={40} speedOnHover={12}>
                {withPhotos.map((f) => (
                  <figure key={f.name} className="m-0 w-64 overflow-hidden rounded-[28px] bg-white md:w-80">
                    <Photo src={f.image} alt={f.name} className="aspect-square w-full" />
                    <figcaption className="flex items-center justify-between gap-2 p-4 font-semibold text-choc">
                      <span>{f.name}</span><span className="text-rasp-deep">{money(f.price)}</span>
                    </figcaption>
                  </figure>
                ))}
              </InfiniteSlider>
            </div>
          </section>

          {/* ---------- About: chocolate fill ---------- */}
          <section id="about" className="bg-cream px-4 py-24 md:px-8" aria-labelledby="about-h">
            <div className="mx-auto max-w-5xl">
              <h2 id="about-h" className="text-xs font-bold uppercase tracking-[.16em] text-rasp-deep">About us</h2>
              <p className="fill-text mt-5 bg-[linear-gradient(var(--color-choc),var(--color-choc))] bg-clip-text bg-no-repeat font-display text-3xl font-semibold leading-tight text-choc/25 [background-size:0%_100%] md:text-5xl">
                {COPY.about}
              </p>
            </div>
          </section>

          {/* ---------- Events ---------- */}
          <section id="events" className="px-4 pb-16 md:px-8" aria-labelledby="events-h">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-choc-dark p-8 text-cream md:p-14">
              <Spotlight className="from-hot via-rasp to-baby blur-2xl" size={280} />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-baby">Dessert catering Birmingham</span>
                <h2 id="events-h" className="rise mt-2 font-display text-4xl font-semibold md:text-6xl">{COPY.eventsTitle}</h2>
                <p className="mt-4 max-w-xl text-cream/85">{COPY.events}</p>
                <ul className="occ mt-6 flex list-none flex-wrap gap-2 p-0">
                  {COPY.occasions.map((o) => <li key={o} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">{o}</li>)}
                </ul>
                <div className="mt-8">
                  <Magnetic intensity={0.3} range={140}>
                    <a href={LINKS.enquiry} className="inline-flex min-h-14 items-center gap-2 rounded-full bg-hot px-8 text-lg font-bold text-choc-dark hover:bg-baby">
                      <CalendarHeart className="size-5" aria-hidden /> Request a Quote
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </section>

          <section id="visit" className="px-4 pb-8 md:px-8" aria-labelledby="visit-h">
            <div className="mx-auto max-w-6xl">
              <Visit cardClass="bg-choc text-cream">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-baby">Find us</span>
                <h2 id="visit-h" className="font-display text-4xl font-semibold">Desserts in Selly Oak</h2>
              </Visit>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>)
