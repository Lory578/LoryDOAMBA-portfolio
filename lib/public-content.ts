import { createSupabaseServerClient } from "@/lib/supabase/server"

export type PublicProject = {
  id: string
  group_name: string
  title_fr: string
  title_en: string | null
  description_fr: string
  description_en: string | null
  tags: string[]
}

export type PublicPublication = {
  id: string
  title_fr: string
  title_en: string | null
  description_fr: string
  description_en: string | null
  publication_name: string
  published_at: string | null
  url: string | null
  image_url: string | null
  kind: "about" | "by"
}

export async function getPublicContent() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { projects: [] as PublicProject[], publications: [] as PublicPublication[] }
  }
  const supabase = await createSupabaseServerClient()
  const [{ data: projects }, { data: publications }] = await Promise.all([
    supabase.from("projects").select("id, group_name, title_fr, title_en, description_fr, description_en, tags").eq("published", true).order("position"),
    supabase.from("publications").select("id, title_fr, title_en, description_fr, description_en, publication_name, published_at, url, image_url, kind").eq("visible", true).order("position"),
  ])
  return { projects: projects ?? [], publications: publications ?? [] }
}
