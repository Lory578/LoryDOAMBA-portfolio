import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { InitiativesSection } from "@/components/initiatives-section"
import { ProjectsSection } from "@/components/projects-section"
import { JourneySection } from "@/components/journey-section"
import { ArticlesSection } from "@/components/articles-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { getPublicContent } from "@/lib/public-content"

export default async function Home() {
  const { projects, publications } = await getPublicContent()
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <InitiativesSection />
      <ProjectsSection projects={projects} />
      <JourneySection />
      <ArticlesSection publications={publications} />
      <ContactSection />
    </main>
  )
}
