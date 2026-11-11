"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const postSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title_fr: z.string().trim().min(1).max(200),
  title_en: z.string().trim().max(200),
  excerpt_fr: z.string().trim().max(500),
  excerpt_en: z.string().trim().max(500),
  content_fr: z.string().max(100000),
  content_en: z.string().max(100000),
  tags: z.string().transform((value) => value.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 20)),
  status: z.enum(["draft", "published"]),
  cover_image_url: z.string().url().or(z.literal("")),
})

const managedSchema = z.object({
  id: z.string().uuid().optional(),
  position: z.coerce.number().int().min(0).max(9999),
  title_fr: z.string().trim().min(1).max(200),
  title_en: z.string().trim().max(200),
  description_fr: z.string().trim().max(1000),
  description_en: z.string().trim().max(1000),
  tags: z.string().transform((value) => value.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 20)),
  url: z.string().url().or(z.literal("")),
  github_url: z.string().url().or(z.literal("")),
  demo_url: z.string().url().or(z.literal("")),
  group_name: z.enum(["ai", "product"]).optional(),
  publication_name: z.string().trim().max(120).optional(),
  kind: z.enum(["about", "by"]).optional(),
  published_at: z.string().optional(),
  published: z.coerce.boolean().optional(),
  visible: z.coerce.boolean().optional(),
})

async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    throw new Error("Accès administrateur requis.")
  }
  return supabase
}

export async function savePost(formData: FormData) {
  const supabase = await requireAdmin()
  const raw = Object.fromEntries(formData.entries())
  const parsed = postSchema.safeParse(raw)
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.")
  const { id, ...post } = parsed.data
  const payload = {
    ...post,
    title_en: post.title_en || null,
    excerpt_en: post.excerpt_en || null,
    content_en: post.content_en || null,
    cover_image_url: post.cover_image_url || null,
    published_at: post.status === "published" ? new Date().toISOString() : null,
  }
  const result = id
    ? await supabase.from("posts").update(payload).eq("id", id)
    : await supabase.from("posts").insert(payload)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/blog")
  revalidatePath("/")
  redirect("/espace-personnel")
}

export async function togglePost(formData: FormData) {
  const supabase = await requireAdmin()
  const id = z.string().uuid().parse(formData.get("id"))
  const status = z.enum(["draft", "published"]).parse(formData.get("status"))
  const result = await supabase.from("posts").update({
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  }).eq("id", id)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/blog")
  revalidatePath("/")
}

export async function deletePost(formData: FormData) {
  const supabase = await requireAdmin()
  const id = z.string().uuid().parse(formData.get("id"))
  const result = await supabase.from("posts").delete().eq("id", id)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/blog")
  revalidatePath("/")
}

export async function uploadAsset(formData: FormData) {
  const supabase = await requireAdmin()
  const file = formData.get("file")
  const bucket = z.enum(["blog-images", "documents"]).parse(formData.get("bucket"))
  if (!(file instanceof File) || file.size === 0) throw new Error("Fichier manquant.")
  const maxSize = bucket === "documents" ? 5 * 1024 * 1024 : 10 * 1024 * 1024
  if (file.size > maxSize) throw new Error("Fichier trop volumineux.")
  const allowed = bucket === "documents" ? ["application/pdf"] : ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!allowed.includes(file.type)) throw new Error("Type de fichier non autorisé.")
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`
  const upload = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false })
  if (upload.error) throw new Error(upload.error.message)
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

export async function saveCv(formData: FormData) {
  const url = await uploadAsset(new FormData(Object.entries({
    file: formData.get("file") as File,
    bucket: "documents",
  })))
  const supabase = await requireAdmin()
  const result = await supabase.from("site_settings").upsert({ id: true, cv_url: url, cv_updated_at: new Date().toISOString() })
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/")
  revalidatePath("/espace-personnel/settings")
}

export async function signOut() {
  const supabase = await requireAdmin()
  await supabase.auth.signOut()
  redirect("/espace-personnel/login")
}

export async function changePassword(formData: FormData) {
  const supabase = await requireAdmin()
  const password = formData.get("password")
  const confirmation = formData.get("confirmation")
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caractères.")
  }
  if (password !== confirmation) {
    throw new Error("Les deux mots de passe ne correspondent pas.")
  }
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(error.message)
  revalidatePath("/espace-personnel/settings")
}

export async function saveProject(formData: FormData) {
  const supabase = await requireAdmin()
  const parsed = managedSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.")
  const { id, ...data } = parsed.data
  const payload = { ...data, demo_url: data.demo_url || null, github_url: data.github_url || null, title_en: data.title_en || null, description_en: data.description_en || null }
  const result = id ? await supabase.from("projects").update(payload).eq("id", id) : await supabase.from("projects").insert(payload)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/")
  redirect("/espace-personnel/projects")
}

export async function savePublication(formData: FormData) {
  const supabase = await requireAdmin()
  const parsed = managedSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Données invalides.")
  const { id, ...data } = parsed.data
  if (!data.publication_name) throw new Error("Le nom de la publication est requis.")
  const payload = { ...data, url: data.url || null, title_en: data.title_en || null, description_en: data.description_en || null }
  const result = id ? await supabase.from("publications").update(payload).eq("id", id) : await supabase.from("publications").insert(payload)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/")
  redirect("/espace-personnel/publications")
}

export async function deleteManaged(formData: FormData) {
  const supabase = await requireAdmin()
  const id = z.string().uuid().parse(formData.get("id"))
  const table = z.enum(["projects", "publications"]).parse(formData.get("table"))
  const result = await supabase.from(table).delete().eq("id", id)
  if (result.error) throw new Error(result.error.message)
  revalidatePath("/")
}
