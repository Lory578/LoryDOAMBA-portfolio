"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = createSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      router.replace("/espace-personnel")
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Connexion impossible.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1a0f2e] px-4 text-[#f4eef8]">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-2xl border border-white/15 bg-[#2a1250] p-8 shadow-2xl">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#f5b841]">Administration</p>
          <h1 className="mt-3 font-serif text-4xl">Connexion</h1>
          <p className="mt-2 text-sm text-white/65">Accès réservé à l’administratrice du portfolio.</p>
        </div>
        <label className="block text-sm">
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-[#f5b841]" />
        </label>
        <label className="block text-sm">
          Mot de passe
          <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 outline-none focus:border-[#f5b841]" />
        </label>
        {error && <p role="alert" className="text-sm text-[#ff9fba]">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-[#d6246e] px-4 py-3 font-medium transition hover:bg-[#e13b7e] disabled:opacity-60">
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </main>
  )
}
