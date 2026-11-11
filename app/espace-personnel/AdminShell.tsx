"use client"

import Link from "next/link"
import { useState } from "react"
import { signOut } from "./actions"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <button className="m-4 rounded-lg border border-border px-3 py-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">Menu</button>
      <aside className={`${open ? "block" : "hidden"} w-full border-b border-border bg-[#1a0f2e] p-6 text-white md:block md:min-h-screen md:w-64 md:border-b-0 md:border-r`}>
        <Link href="/espace-personnel" className="font-serif text-2xl">Lory Doamba</Link>
        <nav className="mt-10 space-y-2 text-sm">
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/espace-personnel">Articles</Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/espace-personnel/posts/new">Nouvel article</Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/espace-personnel/settings">Paramètres</Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/espace-personnel/projects">Projets</Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/espace-personnel/publications">Publications</Link>
          <Link className="block rounded px-3 py-2 hover:bg-white/10" href="/">Voir le site</Link>
          <form action={signOut}><button className="block rounded px-3 py-2 text-left text-white/70 hover:bg-white/10">Déconnexion</button></form>
        </nav>
      </aside>
      <section className="w-full p-5 sm:p-8">{children}</section>
    </div>
  )
}
