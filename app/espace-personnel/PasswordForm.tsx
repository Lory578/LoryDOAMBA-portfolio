"use client"

import { useState } from "react"
import { changePassword } from "./actions"

export function PasswordForm() {
  const [message, setMessage] = useState("")

  return (
    <form
      action={async (formData) => {
        setMessage("")
        try {
          await changePassword(formData)
          setMessage("Mot de passe modifié avec succès.")
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Impossible de modifier le mot de passe.")
        }
      }}
      className="mt-6 space-y-4"
    >
      <label className="block text-sm">
        Nouveau mot de passe
        <input required minLength={8} type="password" name="password" className="field" autoComplete="new-password" />
      </label>
      <label className="block text-sm">
        Confirmer le mot de passe
        <input required minLength={8} type="password" name="confirmation" className="field" autoComplete="new-password" />
      </label>
      <button className="rounded bg-primary px-4 py-2 text-sm text-white">Modifier le mot de passe</button>
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </form>
  )
}
