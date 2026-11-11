"use client"

import { useLanguage } from "@/lib/language-provider"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

export function JourneySection() {
  const { t } = useLanguage()

  return (
    <section id="journey" className="section-shell">
      <SectionAtmosphere variant="clay" />
      <div className="section-frame">
        <div className="section-heading">
          <p className="section-index">05 / {t.journey.title}</p>
          <div>
            <p className="section-kicker">{t.journey.title}</p>
            <h2 className="section-title">{t.journey.title}</h2>
          </div>
        </div>
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative border-l border-primary/30 pl-8 md:pl-12">
            {t.journey.experiences.map((experience, index) => (
              <div key={experience} className="group relative mb-8 last:mb-0">
                <span className="absolute -left-[37px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-[var(--creme)] bg-primary" />
                <span className="mr-4 text-xs font-semibold tracking-[0.2em] text-primary">0{index + 1}</span>
                <p className="inline text-sm leading-7 text-muted-foreground transition-colors group-hover:text-primary md:text-base">
                  {experience}
                </p>
              </div>
            ))}
          </div>
          <MagneticCard className="relative h-fit overflow-hidden bg-[var(--paper)] p-7 md:mt-12 md:p-9">
            <span className="absolute -right-5 -top-10 font-serif text-[11rem] leading-none text-primary/10">+</span>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t.journey.education}
            </h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              {t.journey.educationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </MagneticCard>
        </div>
      </div>
    </section>
  )
}
