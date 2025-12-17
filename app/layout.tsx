import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-provider"
import { LanguageProvider } from "@/lib/language-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Miss EasyTech | Lory Doamba - Developer, Entrepreneur & Tech Mentor",
  description:
    "Portfolio of Miss EasyTech - Web & Mobile Developer, Digital Marketing Consultant, and Community Tech Leader based in Burkina Faso",
  keywords: [
    "developer",
    "entrepreneur",
    "tech mentor",
    "web development",
    "mobile development",
    "digital marketing",
    "Burkina Faso",
  ],
  authors: [{ name: "Lory Doamba" }],
  openGraph: {
    title: "Miss EasyTech | Lory Doamba",
    description: "Developer, Entrepreneur & Tech Mentor transforming technology into accessible opportunities",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="light">
          <LanguageProvider defaultLanguage="fr">
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
