"use client"

import { useInView } from "@/hooks/use-in-view"
import { useLanguage } from "@/lib/language-provider"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

export function SkillsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section id="skills" ref={ref} className="section-shell">
      <SectionAtmosphere variant="rose" />
      <div className="section-frame">
        <div
          className={`transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index">02 / {t.skills.title}</p>
            <div>
              <p className="section-kicker">{t.skills.title}</p>
              <h2 className="section-title">{t.skills.subtitle}</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {t.skills.categories.map(([title, skills], index) => (
              <MagneticCard
                key={title}
                className={`group relative min-h-[285px] overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-2 md:p-8 ${
                  index === 0 ? "bg-secondary text-[var(--creme)]" : index === 1 ? "bg-[#f1dfd4]" : "bg-[#f8dce8]"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="absolute -right-3 -top-5 font-serif text-[9rem] leading-none text-primary/10">0{index + 1}</span>
                <p className={`relative mb-16 text-sm font-semibold ${index === 0 ? "text-[var(--magenta-bright)]" : "text-primary"}`}>0{index + 1}</p>
                <h3 className={`relative font-serif text-2xl ${index === 0 ? "text-[var(--creme)]" : "text-secondary"}`}>{title}</h3>
                <p className={`relative mt-4 text-sm leading-7 ${index === 0 ? "text-[var(--creme)]/70" : "text-muted-foreground"}`}>{skills}</p>
              </MagneticCard>
            ))}
          </div>
          <p className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t.skills.tools}
          </p>
        </div>
      </div>
    </section>
  )
}
