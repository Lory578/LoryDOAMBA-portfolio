"use client"

import { saveProject, savePublication } from "./actions"

type Props = { kind: "project" | "publication"; item?: Record<string, unknown> }

export function ManagedForm({ kind, item = {} }: Props) {
  const action = kind === "project" ? saveProject : savePublication
  const field = (name: string, fallback = "") => String(item[name] ?? fallback)
  return <form action={action} className="grid gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-2">
    {item.id && <input type="hidden" name="id" value={field("id")} />}
    <label className="text-sm">Titre FR<input required name="title_fr" defaultValue={field("title_fr")} className="field" /></label>
    <label className="text-sm">Titre EN<input name="title_en" defaultValue={field("title_en")} className="field" /></label>
    <label className="text-sm md:col-span-2">Description FR<textarea name="description_fr" defaultValue={field("description_fr")} className="field" /></label>
    <label className="text-sm md:col-span-2">Description EN<textarea name="description_en" defaultValue={field("description_en")} className="field" /></label>
    <label className="text-sm">Tags<input name="tags" defaultValue={Array.isArray(item.tags) ? item.tags.join(", ") : field("tags")} className="field" /></label>
    <label className="text-sm">Position<input type="number" name="position" defaultValue={field("position", "0")} className="field" /></label>
    {kind === "project" ? <><label className="text-sm">Groupe<select name="group_name" defaultValue={field("group_name", "product")} className="field"><option value="ai">IA</option><option value="product">Produit</option></select></label><label className="text-sm">URL démo<input name="demo_url" defaultValue={field("demo_url")} className="field" /></label><label className="text-sm">URL GitHub<input name="github_url" defaultValue={field("github_url")} className="field" /></label><label className="flex items-center gap-2 text-sm"><input type="hidden" name="published" value="false" /><input type="checkbox" name="published" value="true" defaultChecked={item.published !== false} /> Visible publiquement</label></> : <><label className="text-sm">Publication<input required name="publication_name" defaultValue={field("publication_name")} className="field" /></label><label className="text-sm">Date<input type="date" name="published_at" defaultValue={field("published_at")} className="field" /></label><label className="text-sm">URL<input name="url" defaultValue={field("url")} className="field" /></label><label className="text-sm">Type<select name="kind" defaultValue={field("kind", "about")} className="field"><option value="about">À propos de moi</option><option value="by">Par moi</option></select></label><label className="flex items-center gap-2 text-sm"><input type="hidden" name="visible" value="false" /><input type="checkbox" name="visible" value="true" defaultChecked={item.visible !== false} /> Visible publiquement</label></>}
    <button className="rounded bg-primary px-4 py-2 text-sm text-white md:col-span-2">Enregistrer</button>
  </form>
}
