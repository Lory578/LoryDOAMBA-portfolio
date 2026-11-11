"use client"

import { useInView } from "@/hooks/use-in-view"
import { useLanguage } from "@/lib/language-provider"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

export function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const { t } = useLanguage()

  return (
    <section id="about" ref={ref} className="section-shell bg-[var(--paper)]">
      <SectionAtmosphere variant="paper" />
      <div className="section-frame">
        <div
          className={`transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index">01 / {t.about.title}</p>
            <div>
              <p className="section-kicker">{t.about.title}</p>
              <h2 className="section-title">{t.about.subtitle}</h2>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="relative space-y-6 border-l-2 border-primary/30 pl-7 text-base leading-8 text-muted-foreground md:pl-10 md:text-lg">
              {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <MagneticCard className="relative flex min-h-[260px] items-end overflow-hidden bg-[var(--creme)] p-7 md:min-h-[320px] md:p-10">
              <span className="absolute -right-4 -top-12 font-serif text-[15rem] leading-none text-primary/10">“</span>
              <blockquote className="relative font-serif text-2xl italic leading-snug text-secondary md:text-3xl">
                « {t.about.quote} »
              </blockquote>
            </MagneticCard>
          </div>
        </div>
      </div>
    </section>
  )
}
