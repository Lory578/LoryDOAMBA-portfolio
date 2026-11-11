import Link from "next/link"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AdminShell } from "../AdminShell"
import { deleteManaged } from "../actions"

export default async function ProjectsAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect("/espace-personnel/login")
  const { data: projects } = await supabase.from("projects").select("*").order("position")
  return <AdminShell><header className="mb-8 flex justify-between"><h1 className="font-serif text-4xl text-secondary">Projets</h1><Link href="/espace-personnel/projects/new" className="rounded bg-primary px-4 py-2 text-sm text-white">Nouveau projet</Link></header><div className="space-y-3">{projects?.map((project) => <article key={project.id} className="flex justify-between rounded-xl border border-border bg-card p-5"><div><h2 className="font-medium text-secondary">{project.title_fr}</h2><p className="text-sm text-muted-foreground">{project.group_name} · {project.published ? "Visible" : "Masqué"}</p></div><div className="flex gap-2"><Link href={`/espace-personnel/projects/${project.id}`} className="rounded border border-border px-3 py-1 text-sm">Modifier</Link><form action={deleteManaged}><input type="hidden" name="id" value={project.id} /><input type="hidden" name="table" value="projects" /><button className="rounded border border-red-300 px-3 py-1 text-sm text-red-700">Supprimer</button></form></div></article>)}</div></AdminShell>
}
