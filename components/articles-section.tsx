"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, User } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const articles = [
  {
    title: "Miss Easytech : Une femme aux multiples talents",
    description:
      "Article de Tolimag présentant mon parcours, mes réalisations et mon impact dans le domaine de la technologie au Burkina Faso.",
    date: "2024",
    url: "#",
    type: "about" as const,
    publication: "Tolimag",
    image: "/tech-woman-article.jpg",
  },
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
    title: "Comment démocratiser l'accès à la technologie",
    description:
      "Mon approche pour rendre la technologie accessible à tous, en particulier aux jeunes et aux femmes en Afrique.",
    date: "2024",
    url: "#",
    type: "by" as const,
    publication: "Miss EasyTech Blog",
    image: "/tech-education-africa.jpg",
  },
  {
    title: "L'entrepreneuriat féminin dans la tech",
    description:
      "Partage de mon expérience en tant qu'entrepreneuse dans le secteur technologique et les défis surmontés.",
    date: "2024",
    url: "#",
    type: "by" as const,
    publication: "Miss EasyTech Blog",
    image: "/woman-entrepreneur-tech.jpg",
  },
  {
    title: "Portrait d'une développeuse engagée",
    description:
      "Interview sur mon engagement communautaire et mon rôle de mentor pour la nouvelle génération de développeurs.",
    date: "2024",
    url: "#",
    type: "about" as const,
    publication: "Tech Magazine",
    image: "/developer-portrait.jpg",
  },
]

export function ArticlesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })
  const { t } = useLanguage()

  return (
    <section id="articles" ref={ref} className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">{t.articles.title}</h2>
            <p className="text-lg text-foreground/70">{t.articles.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <Card
                key={index}
                className={`bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {article.type === "by" ? t.articles.byMe : t.articles.aboutMe}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.publication}
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl text-secondary mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-foreground/70 mb-4 line-clamp-3">{article.description}</p>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-background group-hover:translate-x-1 transition-transform bg-transparent"
                  >
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {t.articles.readMore}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
