import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MotionConfig } from "motion/react"
import { ArrowRight, CalendarHeart, Heart, Sparkles } from "lucide-react"
import "./styles.css"

import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"
import { WordRotate } from "@/components/ui/word-rotate"
import { BlurFade } from "@/components/ui/blur-fade"
import { SparklesText } from "@/components/ui/sparkles-text"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { TextEffect } from "@/components/ui/text-effect"
import { Tilt } from "@/components/ui/tilt"
import { Magnetic } from "@/components/ui/magnetic"
import { Spotlight } from "@/components/ui/spotlight"
import { InView } from "@/components/ui/in-view"
import { COPY, data, Footer, img, LINKS, Logo, MenuTabs, money, Photo, useOpenStatus, useSplashDone, Visit, withPhotos } from "./shared"

/*
 * Concept 2 – "Candy Pop"
 * Built from 21st.dev components (shadcn Button, Magic UI Marquee) plus the same open-source
 * libraries 21st.dev distributes (Magic UI, Motion Primitives). Motion comes from the
 * components themselves (Motion for React) – no GSAP in this concept.
 */

function Header() {
  const status = useOpenStatus()
  return (
    <header className="sticky top-0 z-40 border-b border-choc/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" className="inline-flex min-h-12 items-center"><Logo /></a>
        <nav aria-label="Main" className="hidden gap-1 lg:flex">
          {[["#menu", "Menu"], ["#about", "About Us"], ["#events", "Events"], ["#visit", "Find Us"]].map(([h, l]) => (
            <a key={h} href={h} className="flex min-h-11 items-center rounded-full px-4 font-medium transition-colors hover:bg-blush">{l}</a>
          ))}
        </nav>
        <a href="#visit" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold shadow-sm">
          <span className={`size-2.5 rounded-full ${status.open ? "bg-green-600" : "bg-neutral-400"}`} aria-hidden />
          {status.text}
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const ready = useSplashDone() // hero animates in as the logo intro closes
  return (
    <section id="top" className="relative min-h-[640px] overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pt-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-baby/70 blur-3xl" />
      {ready && (
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-baby px-4 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-rasp-deep">
            <Sparkles className="size-4" aria-hidden /> Birmingham dessert cart · Selly Oak
          </span>
          <TextEffect as="h1" per="word" preset="fade-in-blur" className="mt-5 font-display text-5xl font-bold leading-[1.02] text-choc md:text-7xl">
            {COPY.headline}
          </TextEffect>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 font-display text-2xl font-semibold text-choc md:text-3xl">
            <span>Today’s craving:</span>
            <WordRotate className="text-rasp" words={["Dubai Chocolate", "Loaded Waffle", "Matilda Cake", "Real Mango Pop", "Biscoff Crunch"]} />
          </div>
          <BlurFade delay={0.4}>
            <p className="mt-4 max-w-lg text-lg text-muted-ink">{COPY.sub}</p>
          </BlurFade>
          <BlurFade delay={0.55}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu">
                <ShimmerButton background="#C2185B" shimmerColor="#FFC9DF" className="min-h-13 px-7 font-semibold">
                  View Our Menu <ArrowRight className="ml-2 size-5" aria-hidden />
                </ShimmerButton>
              </a>
              <Button asChild variant="outline" size="lg" className="min-h-13 rounded-full border-2 border-choc bg-transparent px-7 text-base font-semibold text-choc hover:bg-choc hover:text-white">
                <a href="#visit">Find Us</a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="min-h-13 rounded-full px-5 text-base font-semibold text-rasp-deep hover:bg-blush">
                <a href="#events">Book Us for an Event</a>
              </Button>
            </div>
          </BlurFade>
        </div>
        <BlurFade delay={0.2} direction="left">
          <Tilt rotationFactor={6} isRevese className="relative">
            <div className="relative overflow-hidden rounded-[36px] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(194,24,91,.55)]">
              <img src={img("assets/photos/cups-lineup.webp")} alt="Four CraveYardd chocolate strawberry cups" width={1280} height={720} className="aspect-[4/3.3] w-full rounded-[30px] object-cover" />
              <BorderBeam size={180} duration={8} colorFrom="#FF3D8B" colorTo="#C2185B" borderWidth={3} />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-white px-4 py-3 shadow-lg">
              <span className="block text-xs font-bold uppercase tracking-widest text-rasp-deep">Cups from</span>
              <span className="font-display text-2xl font-bold text-choc">{money(data.menu[0].price)}</span>
            </div>
          </Tilt>
        </BlurFade>
      </div>
      )}
    </section>
  )
}

function PhotoMarquee() {
  const photos = data.gallery.filter(Boolean)
  return (
    <section aria-label="CraveYardd photos" className="py-6">
      <Marquee pauseOnHover className="[--duration:36s] [--gap:1rem]">
        {photos.map((p) => (
          <img key={p} src={img(p)} alt="" loading="lazy" className="h-40 w-60 rounded-3xl object-cover md:h-52 md:w-80" />
        ))}
      </Marquee>
    </section>
  )
}

function Favourites() {
  const spans = ["md:col-span-2 md:row-span-2", "", "", "", ""]
  return (
    <section className="px-4 py-16 md:px-8" aria-labelledby="fav-h">
      <div className="mx-auto max-w-6xl">
        <BlurFade inView>
          <span className="text-xs font-bold uppercase tracking-[.14em] text-rasp-deep">Our favourites</span>
          <h2 id="fav-h" className="mt-2 font-display text-4xl font-semibold text-choc md:text-6xl">Most craved right now</h2>
        </BlurFade>
        <BentoGrid className="mt-8 auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3">
          {withPhotos.slice(0, 5).map((f, i) => (
            <BentoCard
              key={f.name}
              name={f.name}
              description={`${f.category} · ${money(f.price)}`}
              Icon={Heart}
              href="#menu"
              cta="See on the menu"
              className={`col-span-1 bg-white ${spans[i]}`}
              background={<Photo src={f.image} alt={f.name} className="absolute inset-0 size-full opacity-90 transition duration-500 group-hover:scale-105 [mask-image:linear-gradient(to_top,transparent_32%,#000_72%)]" />}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-4 py-16 md:px-8" aria-labelledby="about-h">
      <div className="mx-auto max-w-4xl text-center">
        <SparklesText colors={{ first: "#FF3D8B", second: "#C2185B" }} sparklesCount={8} className="font-display text-4xl font-semibold text-choc md:text-6xl">
          <h2 id="about-h">Made for serious cravings</h2>
        </SparklesText>
        <InView variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.6 }} once>
          <p className="mt-6 text-lg leading-relaxed text-muted-ink md:text-2xl">{COPY.about}</p>
        </InView>
      </div>
    </section>
  )
}

function Events() {
  return (
    <section id="events" className="px-4 py-16 md:px-8" aria-labelledby="events-h">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-choc p-8 text-cream md:p-14">
        <Spotlight className="from-hot via-rasp to-baby blur-2xl" size={260} />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.14em] text-baby">Dessert catering Birmingham</span>
            <h2 id="events-h" className="mt-2 font-display text-4xl font-semibold md:text-6xl">{COPY.eventsTitle}</h2>
            <p className="mt-4 max-w-xl text-cream/85">{COPY.events}</p>
            <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
              {COPY.occasions.map((o) => (
                <li key={o} className="rounded-full border-2 border-baby/50 px-4 py-1.5 text-sm font-semibold">{o}</li>
              ))}
            </ul>
          </div>
          <Magnetic intensity={0.3} range={140}>
            <a href={LINKS.enquiry} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-hot px-8 text-lg font-bold text-choc-dark transition hover:bg-baby">
              <CalendarHeart className="size-5" aria-hidden /> Request a Quote
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="absolute -top-16 left-3 z-50 rounded-xl bg-choc px-4 py-3 font-semibold text-white focus:top-3">Skip to content</a>
      <div className="min-h-screen bg-cream font-sans text-foreground">
        <Header />
        <main id="main">
          <Hero />
          <PhotoMarquee />
          <Favourites />
          <section id="menu" className="bg-blush px-4 py-16 md:px-8" aria-labelledby="menu-h">
            <div className="mx-auto max-w-6xl">
              <BlurFade inView>
                <span className="text-xs font-bold uppercase tracking-[.14em] text-rasp-deep">Full menu</span>
                <h2 id="menu-h" className="mt-2 font-display text-4xl font-semibold text-choc md:text-6xl">Pick your craving</h2>
              </BlurFade>
              <div className="mt-6"><MenuTabs listClass="bg-blush" /></div>
            </div>
          </section>
          <About />
          <Events />
          <section id="visit" className="px-4 py-16 md:px-8" aria-labelledby="visit-h">
            <div className="mx-auto max-w-6xl">
              <Visit cardClass="bg-baby text-choc">
                <span className="text-xs font-bold uppercase tracking-[.14em] text-rasp-deep">Find us</span>
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
