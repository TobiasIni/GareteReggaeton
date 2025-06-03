import { createClientSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClientSupabaseClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error al verificar la sesión:", error.message)
      return redirectToLogin(req)
    }

    // Si no hay sesión y no estamos en la página de login, redirigir a login
    if (!session && req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
      console.log("No hay sesión activa, redirigiendo a login")
      return redirectToLogin(req)
    }

    // Si hay sesión y estamos en la página de login, redirigir al dashboard
    if (session && req.nextUrl.pathname === "/admin/login") {
      console.log("Sesión activa, redirigiendo al dashboard")
      return redirectToDashboard(req)
    }

    return res
  } catch (error) {
    console.error("Error en el middleware:", error)
    return redirectToLogin(req)
  }
}

function redirectToLogin(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = "/admin/login"
  return NextResponse.redirect(redirectUrl)
}

function redirectToDashboard(req: NextRequest) {
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = "/admin"
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
} 