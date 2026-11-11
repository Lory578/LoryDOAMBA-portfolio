"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useLanguage } from "@/lib/language-provider"

const HeroSculpt = dynamic(
  () => import("@/components/hero-sculpt").then((m) => m.HeroSculpt),
  { ssr: false },
)

export function HeroSection() {
  const { t } = useLanguage()
  const [firstName, ...rest] = t.hero.title.split(" ")
  const lastName = rest.join(" ")

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[var(--creme)] pt-24 md:items-center">
      <HeroSculpt />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_78%_35%,rgba(201,22,106,0.16),transparent_60%),radial-gradient(ellipse_40%_40%_at_15%_75%,rgba(184,75,50,0.14),transparent_55%),linear-gradient(180deg,rgba(250,244,236,0.2)_0%,rgba(250,244,236,0.75)_72%,var(--creme)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-12 pt-6 sm:px-8 lg:px-12 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-8">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-[40%_40%_36%_36%/28%_28%_48%_48%] border-[1.5px] border-primary shadow-[8px_10px_0_rgba(201,22,106,0.15)] sm:h-20 sm:w-16">
                <Image
                  src="/images/profile.png"
                  alt="Portrait de Lory Doamba"
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </div>
              <p className="text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.2em] text-primary">
                {t.hero.tagline}
              </p>
            </div>

            <h1 className="font-serif text-[clamp(3.4rem,12vw,7.8rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-secondary">
              {firstName}
              <br />
              <em className="font-medium not-italic text-primary sm:italic">{lastName || firstName}</em>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.hero.description}
            </p>
          </div>

          <div className="space-y-5 lg:justify-self-end lg:pb-2">
            <div className="flex flex-wrap gap-2">
              {t.hero.badges.map((badge, i) => (
                <span
                  key={badge}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    i === 0
                      ? "bg-primary text-white"
                      : "border border-primary/30 bg-[var(--paper)]/70 text-[var(--terre-soft)]"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-muse btn-muse-fill">
                {t.hero.viewProjects}
              </a>
              <a href="#contact" className="btn-muse btn-muse-line">
                {t.hero.contactMe}
              </a>
            </div>

            <div className="grid gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-3">
              {t.hero.stats.map((stat) => {
                const [strong, ...restParts] = stat.split(" · ")
                return (
                  <div key={stat}>
                    <strong className="block font-serif text-2xl leading-none text-accent">{strong}</strong>
                    {restParts.length > 0 && (
                      <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                        {restParts.join(" · ")}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
