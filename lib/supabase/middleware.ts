import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
  const isAdminRoute = request.nextUrl.pathname.startsWith("/espace-personnel")
  const isLoginRoute = request.nextUrl.pathname === "/espace-personnel/login"

  if (isAdminRoute && !isLoginRoute && (!user || user.email?.toLowerCase() !== adminEmail)) {
    return NextResponse.redirect(new URL("/espace-personnel/login", request.url))
  }

  if (isLoginRoute && user?.email?.toLowerCase() === adminEmail) {
    return NextResponse.redirect(new URL("/espace-personnel", request.url))
  }

  return response
}
