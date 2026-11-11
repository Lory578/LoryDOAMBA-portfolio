import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AdminShell } from "../AdminShell"
import { saveCv } from "../actions"
import { PasswordForm } from "../PasswordForm"

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect("/espace-personnel/login")
  const { data: settings } = await supabase.from("site_settings").select("cv_url, cv_updated_at").eq("id", true).maybeSingle()
  return <AdminShell><div className="mx-auto max-w-2xl"><p className="font-mono text-xs uppercase tracking-widest text-primary">Configuration</p><h1 className="mb-8 font-serif text-4xl text-secondary">Paramètres</h1><section className="rounded-xl border border-border bg-card p-6"><h2 className="text-xl font-medium text-secondary">CV</h2>{settings?.cv_url ? <p className="mt-2 text-sm text-muted-foreground">Mis à jour le {new Date(settings.cv_updated_at).toLocaleDateString("fr-FR")} · <a className="text-primary underline" href={settings.cv_url} target="_blank" rel="noreferrer">Aperçu</a></p> : <p className="mt-2 text-sm text-muted-foreground">Aucun CV téléversé.</p>}<form action={saveCv} className="mt-6 space-y-4"><input required type="file" name="file" accept="application/pdf" className="block w-full text-sm" /><p className="text-xs text-muted-foreground">PDF uniquement, 5 Mo maximum.</p><button className="rounded bg-primary px-4 py-2 text-sm text-white">Remplacer le CV</button></form></section><section className="mt-6 rounded-xl border border-border bg-card p-6"><h2 className="text-xl font-medium text-secondary">Sécurité</h2><p className="mt-2 text-sm text-muted-foreground">Connectée avec {user.email}. Tu peux remplacer le mot de passe initial ici.</p><PasswordForm /></section></div></AdminShell>
}
