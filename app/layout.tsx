import type React from "react"
import type { Metadata } from "next"
import { Bodoni_Moda, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"
import "./globals.css"

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lory-doamba-portfolio.vercel.app"),
  title: "Lory Doamba | Ingénieure Data & IA, Formatrice Tech",
  description:
    "Portfolio de Lory Doamba, ingénieure Data & IA à Ouagadougou : LLMs, RAG, agents IA, développement full-stack, formation et leadership communautaire (TOW, Geeks Out).",
  keywords: [
    "Lory Doamba",
    "ingénieure Data et IA",
    "RAG",
    "agents IA",
    "formation tech",
    "Burkina Faso",
  ],
  authors: [{ name: "Lory Doamba" }],
  openGraph: {
    title: "Lory Doamba | Ingénieure Data & IA, Formatrice Tech",
    description:
      "Portfolio de Lory Doamba, ingénieure Data & IA, formatrice Tech et fondatrice de communautés.",
    type: "website",
    locale: "fr_FR",
    url: "https://lory-doamba-portfolio.vercel.app",
    images: [{ url: "/icon.svg", width: 512, height: 512, alt: "Lory Doamba" }],
  },
  twitter: {
    card: "summary",
    title: "Lory Doamba | Ingénieure Data & IA, Formatrice Tech",
    description: "Portfolio de Lory Doamba, ingénieure Data & IA à Ouagadougou.",
    images: ["/icon.svg"],
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lory Doamba",
  jobTitle: "Ingénieure Data & IA, Formatrice Tech",
  address: { "@type": "PostalAddress", addressLocality: "Ouagadougou", addressCountry: "BF" },
  url: "https://lory-doamba-portfolio.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/lory-doamba-ab567b277/",
    "https://github.com/lory578",
  ],
  knowsAbout: ["Intelligence artificielle", "Data engineering", "RAG", "LLMs", "Développement web"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${bodoni.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="light">
          <LanguageProvider defaultLanguage="fr">
            {children}
            <Analytics />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
