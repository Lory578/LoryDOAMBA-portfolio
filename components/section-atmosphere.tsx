"use client"

type AtmosphereVariant = "paper" | "rose" | "dark" | "violet" | "clay" | "night" | "contact"

export function SectionAtmosphere({ variant }: { variant: AtmosphereVariant }) {
  return (
    <div className={`section-atmosphere atmosphere-${variant}`} aria-hidden="true">
      <span className="atmosphere-orb atmosphere-orb-a" />
      <span className="atmosphere-orb atmosphere-orb-b" />
      <span className="atmosphere-ring atmosphere-ring-a" />
      <span className="atmosphere-ring atmosphere-ring-b" />
      <span className="atmosphere-star atmosphere-star-a" />
      <span className="atmosphere-star atmosphere-star-b" />
    </div>
  )
}
