"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Languages, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const isBlog = pathname.startsWith("/blog")

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { name: t.nav.about, href: isBlog ? "/#about" : "#about" },
    { name: t.nav.skills, href: isBlog ? "/#skills" : "#skills" },
    { name: t.nav.initiatives, href: isBlog ? "/#initiatives" : "#initiatives" },
    { name: t.nav.projects, href: isBlog ? "/#projects" : "#projects" },
    { name: t.nav.journey, href: isBlog ? "/#journey" : "#journey" },
    { name: t.nav.articles, href: isBlog ? "/#articles" : "#articles" },
    { name: t.nav.blog, href: "/blog", isExternal: true },
    { name: t.nav.contact, href: isBlog ? "/#contact" : "#contact" },
  ]

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isBlog || isOpen
          ? "border-b border-[var(--line)] bg-[var(--creme)]/90 text-secondary backdrop-blur-xl"
          : "bg-transparent text-secondary"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <Link href="/" className="font-serif text-xl font-semibold tracking-[-0.02em] text-secondary md:text-2xl">
          Lory Doamba
        </Link>

        <div className="hidden items-center gap-5 xl:flex xl:gap-6">
          {navItems.map((item) =>
            item.isExternal ? (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ),
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="gap-2 text-secondary hover:bg-primary/10 hover:text-primary"
          >
            <Languages className="h-4 w-4" />
            {language.toUpperCase()}
          </Button>
          <a href={isBlog ? "/#contact" : "#contact"} className="btn-muse bg-primary px-4 py-2 text-white hover:bg-[var(--magenta-bright)]">
            {t.nav.contactButton}
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-secondary xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] xl:hidden">
          <div className="space-y-1 px-5 py-4">
            {navItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2.5 font-medium text-secondary/80 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2.5 font-medium text-secondary/80 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ),
            )}
            <div className="flex gap-3 border-t border-[var(--line)] pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setLanguage(language === "fr" ? "en" : "fr")
                  setIsOpen(false)
                }}
              >
                <Languages className="mr-2 h-4 w-4" />
                {language === "fr" ? "English" : "Français"}
              </Button>
              <a
                href={isBlog ? "/#contact" : "#contact"}
                className="btn-muse flex-1 bg-primary text-center text-white"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.contactButton}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
