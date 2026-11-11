import { notFound, redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { AdminShell } from "../../AdminShell"
import { ManagedForm } from "../../ManagedForm"
export default async function EditPublication({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) redirect("/espace-personnel/login"); const { data } = await supabase.from("publications").select("*").eq("id", id).single(); if (!data) notFound(); return <AdminShell><h1 className="mb-8 font-serif text-4xl text-secondary">Modifier la publication</h1><ManagedForm kind="publication" item={data} /></AdminShell> }
