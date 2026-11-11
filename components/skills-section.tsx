"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Development",
    skills: [
      "React & Next.js",
      "React Native",
      "Node.js & Express",
      "Python & Django",
      "HTML/CSS/JavaScript",
      "TypeScript",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: ["MySQL & PostgreSQL", "Prisma & Sequelize", "Docker & Nginx", "Git & GitHub", "Postman", "Tailwind CSS"],
  },
  {
    title: "Design & Marketing",
    skills: [
      "UI/UX Design",
      "Canva & Webflow",
      "Digital Marketing",
      "Content Strategy",
      "Community Building",
      "Brand Development",
    ],
  },
  {
    title: "Data & AI",
    skills: ["Data Analysis", "Web Scraping", "Big Data", "AI Integration", "Apache NiFi", "Data Modeling"],
  },
]

export function SkillsSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">Compétences</h2>
            <p className="text-lg text-foreground/70">
              Un ensemble de compétences diversifiées alliant technique, créativité et stratégie digitale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className={`bg-card border-border p-6 hover:border-secondary/50 transition-all duration-300 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="font-semibold text-lg text-primary mb-4 pb-2 border-b border-border">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-foreground/70 hover:text-secondary transition-colors cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
