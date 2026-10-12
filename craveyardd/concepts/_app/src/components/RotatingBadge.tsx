"use client"

import { useId, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * RotatingBadge – a circular SVG badge whose edge text slowly rotates
 * while the centre (ring + monogram or logo) stays still.
 *
 * SVG + CSS only (no animation libraries). Works in Next.js (App Router or Pages) with Tailwind CSS.
 *
 * @example
 * <RotatingBadge text="CRAVEYARDD ✦ SELLY OAK ✦ BIRMINGHAM ✦ " center="CY" color="#FF3D8B" size={160} />
 */
export type RotatingBadgeProps = {
  /** Text that runs once around the edge. It is stretched or squeezed to fit exactly one lap. */
  text: string
  /** Monogram letter(s) shown in the middle when no logo is given. */
  center?: string
  /** Optional image shown in the middle instead of the monogram. */
  logoSrc?: string
  /** Rendered width and height in pixels. */
  size?: number
  /** Colour of the text, ring and monogram (any CSS colour). */
  color?: string
  /** Seconds per full turn. */
  duration?: number
  /** Spin anticlockwise instead of clockwise. */
  reverse?: boolean
  /** Extra classes for positioning in a layout. */
  className?: string
}

const CX = 66
const CY = 66
const RADIUS = 50
const CIRCUMFERENCE = 314 // 2 × π × 50 ≈ 314.16
const INNER_RADIUS = 33

// Keyframes live with the component so it works without touching tailwind config.
const KEYFRAMES = "@keyframes rotating-badge-spin{to{transform:rotate(360deg)}}"

export function RotatingBadge({
  text,
  center = "",
  logoSrc,
  size = 132,
  color = "currentColor",
  duration = 24,
  reverse = false,
  className,
}: RotatingBadgeProps) {
  // useId gives ":r1:"-style ids; strip the colons so "#id" references stay valid everywhere.
  const pathId = `rotating-badge-${useId().replace(/:/g, "")}`
  // Read the decorative separators as pauses rather than "star" for screen readers.
  const label = text.replace(/\s*[✦•·★|]+\s*/g, ", ").replace(/[,\s]+$/, "").trim()

  const spinStyle = {
    "--rotating-badge-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties

  return (
    <svg
      viewBox="0 0 132 132"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className={cn("inline-block shrink-0 select-none overflow-visible", className)}
      style={{ color }}
    >
      <style>{KEYFRAMES}</style>
      <defs>
        {/* Invisible circle (r = 50, centred at 66,66) that the text follows, starting at 9 o'clock, clockwise */}
        <path
          id={pathId}
          d={`M ${CX - RADIUS},${CY} a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 ${-RADIUS * 2},0`}
          fill="none"
        />
      </defs>

      {/* Only the text rotates, around the centre of the viewBox */}
      <g
        className="[transform-box:view-box] [transform-origin:center] motion-safe:animate-[rotating-badge-spin_var(--rotating-badge-duration)_linear_infinite]"
        style={spinStyle}
      >
        <text fill="currentColor" fontSize="10.5" fontWeight={600} style={{ textTransform: "uppercase" }}>
          <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>

      {/* Static centre */}
      <circle cx={CX} cy={CY} r={INNER_RADIUS} fill="none" stroke="currentColor" strokeWidth={1.25} />
      {logoSrc ? (
        <image href={logoSrc} x={CX - 29} y={CY - 29} width={58} height={58} preserveAspectRatio="xMidYMid meet" />
      ) : (
        <text
          x={CX}
          y={CY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontSize={center.length > 1 ? 24 : 32}
          fontWeight={700}
        >
          {center}
        </text>
      )}
    </svg>
  )
}

export default RotatingBadge
