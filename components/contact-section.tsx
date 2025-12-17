"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Facebook, Youtube, Music2 } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "lydoamba02@gmail.com",
    href: "mailto:lydoamba02@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+226 02 10 83 04",
    href: "https://wa.me/22602108304",
  },
]

const socialLinks = [
  {
    icon: Music2,
    label: "TikTok",
    href: "#",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "#",
  },
]

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 })
  const { t, language } = useLanguage()

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-secondary mb-6">{t.contact.title}</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{t.contact.subtitle}</p>
          </div>

          <Card className="bg-card border-border p-8 md:p-12 mb-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all group hover:scale-105"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{method.label}</p>
                    <p className="text-foreground font-medium">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                {language === "fr" ? "Suivez-moi sur les réseaux sociaux" : "Follow me on social media"}
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-border hover:border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all bg-transparent hover:scale-110"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">Ouagadougou, Burkina Faso 🇧🇫</p>
            <p className="text-sm text-accent mt-2">
              {language === "fr"
                ? "Disponible pour des projets et collaborations internationales"
                : "Available for international projects and collaborations"}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Miss EasyTech.{" "}
              {language === "fr" ? "Tous droits réservés" : "All rights reserved"}.
            </p>
            <p className="mt-2">
              {language === "fr" ? "Développé par" : "Developed by"}{" "}
              <span className="text-secondary font-medium">Lory Doamba</span>
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
