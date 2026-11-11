"use client"

import Image from "next/image"
import { Calendar, ExternalLink, User } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"
import type { PublicPublication } from "@/lib/public-content"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

const articles = [
  {
    title: "Lory Hesdrie Doamba : Intelligence Artificielle & Afrique",
    description:
      "Portrait de Lory Hesdrie Doamba, pionnière de l'intelligence artificielle en Afrique, publié par Elle Gagne — média dédié aux femmes qui réussissent.",
    date: "2025",
    url: "https://ellegagne.com/lory-hesdrie-doamba-intelligence-artificielle-afrique/",
    type: "about" as const,
    publication: "Elle Gagne",
    image: "/placeholder.svg",
  },
  {
    title: "Miss Easytech : Une femme aux multiples talents",
    description:
      "Article de Tolimag présentant mon parcours, mes réalisations et mon impact dans le domaine de la technologie au Burkina Faso.",
    date: "2024",
    url: null as string | null,
    type: "about" as const,
    publication: "Tolimag",
    image: "/placeholder.svg",
  },
]

export function ArticlesSection({ publications = [] }: { publications?: PublicPublication[] }) {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t, language } = useLanguage()

  const managedArticles =
    publications.length > 0
      ? publications
          .map((article) => ({
            title: language === "en" && article.title_en ? article.title_en : article.title_fr,
            description:
              language === "en" && article.description_en ? article.description_en : article.description_fr,
            date: article.published_at ? new Date(article.published_at).getFullYear().toString() : "",
            url: article.url,
            type: article.kind,
            publication: article.publication_name,
            image: article.image_url || "/placeholder.svg",
          }))
          .filter((article) => article.url)
      : articles.filter((article) => article.url || article.publication === "Tolimag")

  return (
    <section id="articles" ref={ref} className="section-shell bg-[var(--paper)]">
      <SectionAtmosphere variant="night" />
      <div className="section-frame">
        <div
          className={`transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index">06 / {t.articles.title}</p>
            <div>
              <p className="section-kicker">{t.articles.title}</p>
              <h2 className="section-title">{t.articles.subtitle}</h2>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {managedArticles.map((article, index) => (
              <MagneticCard key={article.title} className={`group overflow-hidden ${index === 1 ? "md:mt-16" : ""}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    width={800}
                    height={450}
                    unoptimized
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    {article.type === "by" ? t.articles.byMe : t.articles.aboutMe}
                  </span>
                </div>
                <div className="border-b border-[var(--line)] px-1 py-6">
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.publication}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-secondary transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                  {article.url ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-[var(--creme)]"
                    >
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {t.articles.readMore}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <p className="mt-4 text-xs text-muted-foreground">[À CONFIRMER : lien à ajouter]</p>
                  )}
                </div>
              </MagneticCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
