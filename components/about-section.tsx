"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-provider"

export function AboutSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 })
  const { t, language } = useLanguage()

  return (
    <section id="about" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-8 animate-fade-in-up">
            {t.about.title}
          </h2>

          <Card className="bg-card border-border p-8 md:p-12 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
              {language === "fr" ? (
                <>
                  <p className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    Je m'appelle <span className="text-secondary font-semibold">Lory Doamba</span>, connue sous le nom{" "}
                    <span className="text-secondary font-semibold">Miss EasyTech</span>. Mon parcours combine{" "}
                    <span className="text-accent">
                      tech, entrepreneuriat, engagement communautaire et marketing digital
                    </span>
                    .
                  </p>

                  <p className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    Je crois que{" "}
                    <span className="text-secondary font-semibold">
                      la technologie est un outil de transformation sociale
                    </span>
                    , capable de connecter les personnes, créer des opportunités et inspirer la jeunesse.
                  </p>

                  <p
                    className="text-xl font-serif italic text-secondary pt-4 animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {"« "}Mon objectif : rendre la compréhension et l'apprentissage de la technologie aisés et simples
                    {" »"}
                  </p>
                </>
              ) : (
                <>
                  <p className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    My name is <span className="text-secondary font-semibold">Lory Doamba</span>, known as{" "}
                    <span className="text-secondary font-semibold">Miss EasyTech</span>. My journey combines{" "}
                    <span className="text-accent">
                      tech, entrepreneurship, community engagement, and digital marketing
                    </span>
                    .
                  </p>

                  <p className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    I believe that{" "}
                    <span className="text-secondary font-semibold">technology is a tool for social transformation</span>
                    , capable of connecting people, creating opportunities, and inspiring youth.
                  </p>

                  <p
                    className="text-xl font-serif italic text-secondary pt-4 animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {'" '}My goal: to make understanding and learning technology easy and simple{' "'}
                  </p>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
