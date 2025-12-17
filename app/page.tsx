import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { InitiativesSection } from "@/components/initiatives-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ArticlesSection } from "@/components/articles-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <InitiativesSection />
      <SkillsSection />
      <ProjectsSection />
      <ArticlesSection />
      <ContactSection />
    </main>
  )
}
