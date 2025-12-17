"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Application mobile de localisation",
    description: "Application de localisation et notation des services essentiels pour la ville de Ouagadougou",
    tags: ["React Native", "Expo", "OSM", "OSRM", "DOCKER"],
    period: "2025",
  },
  {
    title: "Sites web vitrines",
    description: "Formation en Conception et développement de sites web modernes et responsives",
    tags: ["Next.js", "Tailwind CSS","React.js"],
    period: "2025",
  },
  {
    title: "MVP d'Application mobile de suivi du rythme cardiaque STOMP",
    description: "Conception de la partie frontend d'une application mobile Android/ios pour suivre le rythme cardiaque des athletes",
    tags: ["React Native", "Expo"],
    period: "2025",
  },
  {
    title: "Marketing Digital sur les reseaux",
    description: "Consultation et stratégies de marketing digital pour individuel et petites entreprises",
    tags: ["Strategy", "Content", "Analytics"],
    period: "Ongoing- En cours",
  },
]

const achievements = [
  "Lauréate internationale Raise your Hack - LabLab AI",
  "Lauréate Hackathon C2i 2023",
  "Certificate en Journalisme numérique - Africa Women in Media",
  "Data Manager - Dakar Institute of Technology",
]

export function ProjectsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">Projets & Réalisations</h2>
            <p className="text-lg text-foreground/70">
              Une sélection de mes projets et accomplissements dans le domaine de la tech et du digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 group ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-xl text-secondary group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-foreground/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-accent">{project.period}</p>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <Card className="bg-card border-border p-8">
            <h3 className="font-serif text-2xl font-bold text-secondary mb-6">Certifications & Récompenses</h3>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground/70">
                  <span className="text-accent text-xl">✦</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
