"use client"

import { useInView } from "@/hooks/use-in-view"
import { Button } from "@/components/ui/button"
import { Facebook, Linkedin, Mail, Music2, Phone, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/language-provider"
import { MagneticCard } from "@/components/magnetic-card"
import { SectionAtmosphere } from "@/components/section-atmosphere"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "[À CONFIRMER : lorydoamba02@gmail.com ou lydoamba02@gmail.com]",
    href: "mailto:lorydoamba02@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "[À CONFIRMER]",
    href: "#contact",
  },
]

const socialLinks = [
  { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@lorydoamba" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@MissEasyTech" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lory-doamba-ab567b277/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/17QuKGT1Zi/?mibextid=wwXIfr",
  },
]

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const { t, language } = useLanguage()

  return (
    <section id="contact" ref={ref} className="section-shell bg-secondary text-[var(--creme)]">
      <SectionAtmosphere variant="contact" />
      <div className="section-frame">
        <div
          className={`mx-auto max-w-3xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="section-heading">
            <p className="section-index text-[var(--magenta-bright)]">07 / Contact</p>
            <div>
              <p className="section-kicker text-[var(--magenta-bright)]">Contact</p>
              <h2 className="section-title text-[var(--creme)]">{t.contact.title}</h2>
              <p className="section-intro text-[var(--creme)]/70">{t.contact.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-10 border-y border-white/15 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-12">
            <div className="grid gap-4">
              {contactMethods.map((method) => (
                <MagneticCard
                  key={method.label}
                  className="flex items-start gap-4 rounded-sm border border-white/10 p-4 transition-colors hover:border-primary/60"
                >
                  <a href={method.href} className="flex w-full items-start gap-4">
                    <div className="rounded-lg bg-primary/15 p-3">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--creme)]/55">{method.label}</p>
                      <p className="mt-1 text-sm font-medium text-[var(--creme)]">{method.value}</p>
                    </div>
                  </a>
                </MagneticCard>
              ))}
            </div>

            <div className="flex flex-col justify-end border-l border-white/15 pl-6 md:pl-10">
              <p className="mb-4 text-center text-sm text-[var(--creme)]/55">
                {language === "fr" ? "Suivez-moi sur les réseaux sociaux" : "Follow me on social media"}
              </p>
              <div className="flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="border-white/20 bg-transparent text-[var(--creme)] hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-[var(--creme)]/45">
                LinkedIn : [À CONFIRMER — l&apos;URL du site et celle du profil peuvent différer]
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-accent">{t.contact.availability}</p>
        </div>
      </div>

      <footer className="mt-16 border-t border-white/10 pt-8">
        <div className="mx-auto max-w-[1180px] px-5 text-center text-sm text-[var(--creme)]/50 sm:px-8 lg:px-12">
          <p>{t.footer.rights}</p>
          <p className="mt-2">
            <span className="text-[var(--creme)]/80">{t.footer.secondary}</span> · {t.footer.place}
          </p>
        </div>
      </footer>
    </section>
  )
}
