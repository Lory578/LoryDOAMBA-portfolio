"use client"

import { useInView } from "@/hooks/use-in-view"
import { useLanguage } from "@/lib/language-provider"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

export function InitiativesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section id="initiatives" ref={ref} className="section-shell bg-secondary text-[var(--creme)]">
      <SectionAtmosphere variant="dark" />
      <div className="section-frame">
        <div
          className={`transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index text-[var(--magenta-bright)]">03 / {t.initiatives.title}</p>
            <div>
              <p className="section-kicker text-[var(--magenta-bright)]">{t.initiatives.title}</p>
              <h2 className="section-title text-[var(--creme)]">{t.initiatives.subtitle}</h2>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-12">
            {t.initiatives.items.map(([title, role, date, description], index) => (
              <MagneticCard
                key={title}
                className={`group relative overflow-hidden border border-white/15 p-6 transition-all hover:border-[var(--magenta-bright)] hover:bg-white/[0.05] md:p-8 ${
                  index === 0 ? "md:col-span-12 md:min-h-[220px]" : "md:col-span-6 md:min-h-[235px]"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <span className="absolute right-5 top-2 font-serif text-8xl leading-none text-white/[0.04]">0{index + 1}</span>
                <p className="relative text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--magenta-bright)]">
                  {date}
                </p>
                <h3 className="relative mt-8 font-serif text-2xl text-[var(--creme)]">{title}</h3>
                <p className="relative mt-1 text-sm font-medium text-primary">{role}</p>
                <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-[var(--creme)]/70">{description}</p>
              </MagneticCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
