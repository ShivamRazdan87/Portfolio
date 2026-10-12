import { RotatingBadge } from "@/components/RotatingBadge"

/**
 * Example: RotatingBadge in a page section, gold (#C9A55C) on a dark background.
 * Drop into a Next.js page, e.g. app/page.tsx:  <BadgeShowcase />
 */
export function BadgeShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#121212] px-6 py-24 text-[#F4EFE6]">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A55C]">Est. 2026</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Crafted slowly, served with care.</h2>
          <p className="mt-5 max-w-md text-[#F4EFE6]/70">
            The badge text runs once around the circle and keeps turning, while the monogram in the middle stays perfectly still.
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          {/* Monogram */}
          <RotatingBadge text="Handmade ✦ Small batch ✦ Since 2026 ✦ " center="C" color="#C9A55C" size={180} />
          {/* Logo, spinning the other way and a little faster */}
          <RotatingBadge
            text="Open daily ✦ 2PM – 11PM ✦ "
            logoSrc="/logo.png"
            color="#C9A55C"
            size={140}
            duration={18}
            reverse
            className="hidden sm:inline-block"
          />
        </div>
      </div>
    </section>
  )
}

export default BadgeShowcase
