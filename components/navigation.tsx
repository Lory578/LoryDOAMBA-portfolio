"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"
import { useLanguage } from "@/lib/language-provider"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.initiatives, href: "#initiatives" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.articles, href: "#articles" },
    { name: t.nav.blog, href: "/blog", isExternal: true },
    { name: t.nav.contact, href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="text-xl md:text-2xl font-bold font-serif text-primary hover:text-secondary transition-colors"
          >
            MISS EASYTECH
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-secondary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ),
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-secondary hover:bg-primary/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="text-foreground hover:text-secondary hover:bg-primary/10 gap-2 transition-all font-medium"
            >
              <Languages className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-foreground/80 hover:text-secondary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-foreground/80 hover:text-secondary transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ),
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  setIsOpen(false)
                }}
                className="text-foreground hover:text-secondary flex-1"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {theme === "dark" ? "Light" : "Dark"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLanguage(language === "fr" ? "en" : "fr")
                  setIsOpen(false)
                }}
                className="text-foreground hover:text-secondary flex-1"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === "fr" ? "English" : "Français"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
