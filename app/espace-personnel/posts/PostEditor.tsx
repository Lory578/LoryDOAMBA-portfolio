"use client"

import { useEffect, useMemo, useState } from "react"
import { savePost, uploadAsset } from "../actions"

type Post = {
  id?: string
  slug: string
  title_fr: string
  title_en: string | null
  excerpt_fr: string
  excerpt_en: string | null
  content_fr: string
  content_en: string | null
  tags: string[]
  status: "draft" | "published"
  cover_image_url: string | null
}

const initialPost: Post = { slug: "", title_fr: "", title_en: "", excerpt_fr: "", excerpt_en: "", content_fr: "", content_en: "", tags: [], status: "draft", cover_image_url: "" }

export function PostEditor({ post = initialPost }: { post?: Post }) {
  const [value, setValue] = useState<Post>(() => {
    if (typeof window === "undefined") return post
    const saved = localStorage.getItem(`admin-draft-${post.id ?? "new"}`)
    if (!saved) return post
    try {
      return JSON.parse(saved) as Post
    } catch {
      return post
    }
  })
  const [tab, setTab] = useState<"fr" | "en">("fr")
  const [preview, setPreview] = useState(false)
  const [savedAt, setSavedAt] = useState("")
  const [message, setMessage] = useState("")
  const content = tab === "fr" ? value.content_fr : value.content_en ?? ""

  useEffect(() => {
    const timer = window.setInterval(() => {
      localStorage.setItem(`admin-draft-${value.id ?? "new"}`, JSON.stringify(value))
      setSavedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }))
    }, 30000)
    return () => window.clearInterval(timer)
  }, [value])

  const rendered = useMemo(() => content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/^### (.*)$/gm, "<h3>$1</h3>").replace(/^## (.*)$/gm, "<h2>$1</h2>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />"), [content])
  function update(field: keyof Post, next: string) { setValue((current) => ({ ...current, [field]: next })) }
  async function handleUpload(file: File) {
    const data = new FormData()
    data.set("file", file)
    data.set("bucket", "blog-images")
    try { update("cover_image_url", await uploadAsset(data)); setMessage("Image téléversée.") } catch (error) { setMessage(error instanceof Error ? error.message : "Téléversement impossible.") }
  }

  return (
    <form action={savePost} className="mx-auto max-w-6xl space-y-6">
      {value.id && <input type="hidden" name="id" value={value.id} />}
      <input type="hidden" name="slug" value={value.slug} /><input type="hidden" name="title_fr" value={value.title_fr} /><input type="hidden" name="title_en" value={value.title_en ?? ""} /><input type="hidden" name="excerpt_fr" value={value.excerpt_fr} /><input type="hidden" name="excerpt_en" value={value.excerpt_en ?? ""} /><input type="hidden" name="content_fr" value={value.content_fr} /><input type="hidden" name="content_en" value={value.content_en ?? ""} /><input type="hidden" name="tags" value={value.tags.join(", ")} /><input type="hidden" name="status" value={value.status} /><input type="hidden" name="cover_image_url" value={value.cover_image_url ?? ""} />
      <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">Éditeur Markdown</p><h1 className="font-serif text-4xl text-secondary">{value.id ? "Modifier l'article" : "Nouvel article"}</h1></div><div className="flex gap-2"><button type="button" onClick={() => setPreview(!preview)} className="rounded border border-border px-3 py-2 text-sm">{preview ? "Éditer" : "Aperçu"}</button><button className="rounded bg-primary px-4 py-2 text-sm text-white">Enregistrer</button></div></header>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          <label className="block text-sm">Titre FR<input value={value.title_fr} onChange={(e) => { update("title_fr", e.target.value); if (!value.id) update("slug", e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) }} className="field" /></label>
          <label className="block text-sm">Titre EN<input value={value.title_en ?? ""} onChange={(e) => update("title_en", e.target.value)} className="field" /></label>
          <label className="block text-sm">Slug<input value={value.slug} onChange={(e) => update("slug", e.target.value)} className="field" /></label>
          <label className="block text-sm">Extrait FR<textarea value={value.excerpt_fr} onChange={(e) => update("excerpt_fr", e.target.value)} className="field" /></label>
          <label className="block text-sm">Extrait EN<textarea value={value.excerpt_en ?? ""} onChange={(e) => update("excerpt_en", e.target.value)} className="field" /></label>
          <label className="block text-sm">Tags<input value={value.tags.join(", ")} onChange={(e) => setValue({ ...value, tags: e.target.value.split(",").map((tag) => tag.trim()) })} className="field" /></label>
          <label className="block text-sm">Statut<select value={value.status} onChange={(e) => update("status", e.target.value)} className="field"><option value="draft">Brouillon</option><option value="published">Publié</option></select></label>
          <label className="block text-sm">Image de couverture<input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} className="mt-2 block w-full text-sm" /></label>
          {message && <p className="text-sm text-primary">{message}</p>}
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex gap-2"><button type="button" onClick={() => setTab("fr")} className={`rounded px-3 py-1 text-sm ${tab === "fr" ? "bg-primary text-white" : "bg-muted"}`}>FR</button><button type="button" onClick={() => setTab("en")} className={`rounded px-3 py-1 text-sm ${tab === "en" ? "bg-primary text-white" : "bg-muted"}`}>EN</button>{savedAt && <span className="ml-auto text-xs text-muted-foreground">Enregistré à {savedAt}</span>}</div>
          {preview ? <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rendered }} /> : <textarea value={content} onChange={(e) => update(tab === "fr" ? "content_fr" : "content_en", e.target.value)} placeholder="Écrivez votre article en Markdown…" className="min-h-[520px] w-full resize-y rounded border border-border bg-background p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-primary" />}
        </div>
      </div>
    </form>
  )
}
