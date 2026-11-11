"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"
import { Globe, Heart, Briefcase, Newspaper } from "lucide-react"

const initiatives = [
  {
    icon: Globe,
    title: "Communauté Tech & Opportunités Worldwide",
    description: "Création d'un réseau pour partager des opportunités tech pour jeunes et femmes à l'international",
    features: [
      "Organisation de hackathons et événements tech",
      "Sessions de mentorat",
      "Faciliter l'accès à la tech pour tous",
    ],
  },
  {
    icon: Heart,
    title: "BIOD - Engagement bénévole",
    description: "Association communautaire pour l'intégration des orphelins et des démunis",
    features: ["Actions éducatives et numériques", "Programmes d'autonomisation des jeunes", "Ateliers de formation"],
  },
  {
    icon: Briefcase,
    title: "Easy Nova Solutions",
    description: "Mon entreprise pour services digitaux et développement d'applications",
    features: [
      "Conception de sites web et applications",
      "Branding et design graphique",
      "Solutions digitales sur mesure",
    ],
  },
  {
    icon: Newspaper,
    title: "Reconnaissance médiatique",
    description: "Article publié par Tolimag sur mon parcours et mes réalisations",
    features: ["Valorisation de mon impact tech", "Rayonnement communautaire", "Inspiration pour la jeunesse"],
  },
]

export function InitiativesSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="initiatives" ref={ref} className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">Mes initiatives & projets</h2>
            <p className="text-lg text-foreground/70">
              Des actions concrètes pour démocratiser l'accès à la technologie et créer un impact social durable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {initiatives.map((initiative, index) => (
              <Card
                key={index}
                className={`bg-card border-border p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <initiative.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-secondary mb-2">{initiative.title}</h3>
                    <p className="text-foreground/70 mb-4">{initiative.description}</p>
                    <ul className="space-y-2">
                      {initiative.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/60">
                          <span className="text-accent mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
