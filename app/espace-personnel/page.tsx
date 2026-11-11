import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AdminShell } from "./AdminShell"
import { deletePost, togglePost } from "./actions"

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const params = await searchParams
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect("/espace-personnel/login")
  const { data: posts, error } = await supabase.from("posts").select("id, title_fr, title_en, status, tags, updated_at, published_at").order("updated_at", { ascending: false })
  const filtered = (posts ?? []).filter((post) => (!params.q || post.title_fr.toLowerCase().includes(params.q.toLowerCase())) && (!params.status || post.status === params.status))
  const published = posts?.filter((post) => post.status === "published").length ?? 0
  return <AdminShell><header className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">Tableau de bord</p><h1 className="font-serif text-4xl text-secondary">Articles</h1></div>  <Link href="/espace-personnel/posts/new" className="rounded bg-primary px-4 py-2 text-sm text-white">Nouvel article</Link></header>
    <div className="mb-6 grid gap-3 sm:grid-cols-3"><div className="stat"><strong>{posts?.length ?? 0}</strong><span>Total</span></div><div className="stat"><strong>{published}</strong><span>Publiés</span></div><div className="stat"><strong>{(posts?.length ?? 0) - published}</strong><span>Brouillons</span></div></div>
    <form className="mb-6 flex flex-wrap gap-2"><input name="q" defaultValue={params.q} placeholder="Rechercher…" className="field max-w-xs" /><select name="status" defaultValue={params.status} className="field w-auto"><option value="">Tous les statuts</option><option value="published">Publiés</option><option value="draft">Brouillons</option></select><button className="rounded border border-border px-4 py-2 text-sm">Filtrer</button></form>
    {error ? <p role="alert" className="rounded-lg border border-red-300 p-4 text-red-700">{error.message}</p> : <div className="space-y-3">{filtered.map((post) => <article key={post.id} className="rounded-xl border border-border bg-card p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-medium text-secondary">{post.title_fr}</h2><p className="mt-1 text-sm text-muted-foreground">{post.title_en || "EN non renseigné"} · {new Date(post.updated_at).toLocaleDateString("fr-FR")}</p><div className="mt-2 flex flex-wrap gap-1">{post.tags?.map((tag: string) => <span key={tag} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{tag}</span>)}</div></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{post.status === "published" ? "Publié" : "Brouillon"}</span></div><div className="mt-4 flex flex-wrap gap-2 text-sm">    <Link href={`/espace-personnel/posts/${post.id}`} className="rounded border border-border px-3 py-1.5">Modifier</Link><form action={togglePost}><input type="hidden" name="id" value={post.id} /><input type="hidden" name="status" value={post.status === "published" ? "draft" : "published"} /><button className="rounded border border-border px-3 py-1.5">{post.status === "published" ? "Dépublier" : "Publier"}</button></form><form action={deletePost}><input type="hidden" name="id" value={post.id} /><button className="rounded border border-red-300 px-3 py-1.5 text-red-700" onClick={(event) => { if (!confirm("Supprimer définitivement cet article ?")) event.preventDefault() }}>Supprimer</button></form></div></article>)}</div>}
  </AdminShell>
}
