"use client"

import type { CSSProperties, PropsWithChildren, PointerEvent } from "react"
import { useRef } from "react"

export function MagneticCard({
  children,
  className = "",
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty("--tilt-x", `${x * 8}deg`)
    element.style.setProperty("--tilt-y", `${y * -8}deg`)
    element.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`)
    element.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`)
  }

  const handleLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty("--tilt-x", "0deg")
    element.style.setProperty("--tilt-y", "0deg")
    element.style.setProperty("--shine-x", "50%")
    element.style.setProperty("--shine-y", "50%")
  }

  return (
    <div
      ref={ref}
      className={`magnetic-card ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={style}
    >
      <div className="magnetic-card-shine" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
