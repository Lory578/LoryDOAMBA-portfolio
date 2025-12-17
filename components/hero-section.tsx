"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <p className="text-accent text-sm md:text-base font-medium uppercase tracking-wider animate-slide-in-left">
                {t.hero.tagline}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary leading-tight text-balance animate-scale-in">
                {t.hero.title}
              </h1>
            </div>

            <p
              className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl text-pretty animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              {t.hero.description} <span className="text-secondary font-semibold">{t.hero.descriptionHighlight}</span>{" "}
              {t.hero.descriptionEnd}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white hover:scale-105 transition-transform"
              >
                <a href="#projects">{t.hero.viewProjects}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-secondary text-secondary hover:bg-secondary hover:text-background bg-transparent hover:scale-105 transition-transform"
              >
                <a href="#contact">{t.hero.contactMe}</a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 animate-pulse-glow" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/profile.png"
                  alt="Miss EasyTech - Lory Doamba"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-secondary" />
      </div>
    </section>
  )
}
