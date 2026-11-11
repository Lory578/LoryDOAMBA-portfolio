"use client"

import { useInView } from "@/hooks/use-in-view"
import { useLanguage } from "@/lib/language-provider"
import type { PublicProject } from "@/lib/public-content"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

export function ProjectsSection({ projects = [] }: { projects?: PublicProject[] }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t, language } = useLanguage()

  const managedProjects =
    projects.length > 0
      ? projects.map(
          (project) =>
            [
              language === "en" && project.title_en ? project.title_en : project.title_fr,
              language === "en" && project.description_en ? project.description_en : project.description_fr,
              project.tags,
              project.group_name,
            ] as const,
        )
      : t.projects.items.map(
          ([title, description, tags], index) =>
            [title, description, tags, index < 2 ? "ai" : "product"] as const,
        )

  const aiProjects = managedProjects.filter((project) => project[3] === "ai")
  const productProjects = managedProjects.filter((project) => project[3] !== "ai")

  return (
    <section id="projects" ref={ref} className="section-shell bg-[var(--paper)]">
      <SectionAtmosphere variant="violet" />
      <div className="section-frame">
        <div
          className={`transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index">04 / {t.projects.title}</p>
            <div>
              <p className="section-kicker">{t.projects.title}</p>
              <h2 className="section-title">{t.projects.subtitle}</h2>
            </div>
          </div>

          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t.projects.aiTitle}
          </h3>
          <div className="mb-16 grid gap-4 md:grid-cols-2">
            {aiProjects.map(([title, description, tags], index) => (
              <MagneticCard
                key={title}
                className={`relative overflow-hidden border border-[var(--line)] p-7 transition-transform duration-300 hover:-translate-y-1 md:p-9 ${index === 0 ? "bg-secondary md:col-span-2" : "bg-[var(--creme)]"}`}
              >
                {index === 0 && <span className="absolute -right-4 -top-10 font-serif text-[12rem] leading-none text-white/[0.05]">IA</span>}
                <h3 className={`relative font-serif text-2xl ${index === 0 ? "text-[var(--creme)]" : "text-secondary"}`}>{title}</h3>
                <p className={`relative mt-3 text-sm leading-relaxed ${index === 0 ? "text-[var(--creme)]/70" : "text-muted-foreground"}`}>{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </MagneticCard>
            ))}
          </div>

          <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {t.projects.productTitle}
          </h3>
          <div className="grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-3">
            {productProjects.map(([title, description, tags]) => (
              <MagneticCard key={title} className="border-b border-[var(--line)] pb-8">
                <h3 className="font-serif text-xl text-secondary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </MagneticCard>
            ))}
          </div>

          <div className="mt-16 border-l-2 border-primary bg-[var(--creme)] px-6 py-7 md:px-9">
            <h3 className="font-serif text-2xl text-secondary">
              {language === "fr" ? "Certifications & distinctions" : "Certifications & distinctions"}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Raise your Hack (LabLab AI) · Hackathon C2i 2023 · Africa Women in Media · Data Manager ·
              Développement Frontend · Youth Shaping Global Development · Programme WICE · Fondements du
              Leadership
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
