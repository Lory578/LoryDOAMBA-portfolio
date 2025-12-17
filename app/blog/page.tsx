"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-provider"

interface BlogPost {
  id: string
  title: string
  titleEn: string
  excerpt: string
  excerptEn: string
  content: string
  contentEn: string
  date: string
  readTime: string
  tags: string[]
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Pourquoi j'ai choisi la tech",
    titleEn: "Why I Chose Tech",
    excerpt: "Mon parcours personnel dans le monde de la technologie et ce qui m'a inspiré à devenir développeuse.",
    excerptEn: "My personal journey in the tech world and what inspired me to become a developer.",
    content: "Vous pouvez modifier ce contenu pour ajouter vos propres pensées et réflexions...",
    contentEn: "You can edit this content to add your own thoughts and reflections...",
    date: "15 Déc 2024",
    readTime: "5 min",
    tags: ["Tech", "Parcours", "Inspiration"],
    image: "/woman-coding-laptop.jpg",
  },
  {
    id: "2",
    title: "L'importance du mentorat dans la tech",
    titleEn: "The Importance of Mentorship in Tech",
    excerpt: "Réflexions sur le rôle crucial du mentorat pour les jeunes développeurs en Afrique.",
    excerptEn: "Thoughts on the crucial role of mentorship for young developers in Africa.",
    content: "Vous pouvez modifier ce contenu pour ajouter vos propres pensées et réflexions...",
    contentEn: "You can edit this content to add your own thoughts and reflections...",
    date: "10 Déc 2024",
    readTime: "7 min",
    tags: ["Mentorat", "Communauté", "Afrique"],
    image: "/mentorship-tech-africa.jpg",
  },
  {
    id: "3",
    title: "Mes outils préférés pour le développement",
    titleEn: "My Favorite Development Tools",
    excerpt: "Une liste des outils et technologies que j'utilise quotidiennement dans mes projets.",
    excerptEn: "A list of tools and technologies I use daily in my projects.",
    content: "Vous pouvez modifier ce contenu pour ajouter vos propres pensées et réflexions...",
    contentEn: "You can edit this content to add your own thoughts and reflections...",
    date: "5 Déc 2024",
    readTime: "4 min",
    tags: ["Outils", "Développement", "Productivité"],
    image: "/developer-tools-workspace.jpg",
  },
]

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const { language } = useLanguage()
  const isFr = language === "fr"

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <main className="pt-24 pb-20">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Button variant="ghost" onClick={() => setSelectedPost(null)} className="mb-8 hover:bg-primary/10 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {isFr ? "Retour au blog" : "Back to blog"}
            </Button>

            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt={isFr ? selectedPost.title : selectedPost.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {selectedPost.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {selectedPost.readTime}
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              {isFr ? selectedPost.title : selectedPost.titleEn}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                {isFr ? selectedPost.content : selectedPost.contentEn}
              </p>
            </div>
          </article>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-16 animate-fade-in-up">
            <Link href="/">
              <Button variant="ghost" className="mb-6 hover:bg-primary/10 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {isFr ? "Retour à l'accueil" : "Back to home"}
              </Button>
            </Link>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6">
              {isFr ? "Mon Blog" : "My Blog"}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              {isFr
                ? "Mes pensées, réflexions et expériences dans le monde de la technologie, du développement et de l'entrepreneuriat."
                : "My thoughts, reflections and experiences in the world of technology, development and entrepreneurship."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="bg-card/80 backdrop-blur-sm border-border overflow-hidden hover:border-primary/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={isFr ? post.title : post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
                    {isFr ? post.title : post.titleEn}
                  </h3>

                  <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                    {isFr ? post.excerpt : post.excerptEn}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-16 p-8 md:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-border text-center">
            <Tag className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary mb-4">
              {isFr ? "Envie de collaborer ?" : "Want to collaborate?"}
            </h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto leading-relaxed">
              {isFr
                ? "N'hésitez pas à me contacter pour discuter de projets, collaborations ou simplement échanger sur la tech."
                : "Feel free to contact me to discuss projects, collaborations or simply chat about tech."}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <a href="mailto:laurelnekomba@gmail.com">{isFr ? "Me contacter" : "Contact me"}</a>
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
