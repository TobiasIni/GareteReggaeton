import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  console.log("Middleware ejecutándose para ruta:", req.nextUrl.pathname)
  
  // Crear una respuesta base
  const res = NextResponse.next()
  
  // Crear cliente de Supabase con el middleware
  const supabase = createMiddlewareClient({ req, res })
  
  // Obtener la URL actual
  const requestUrl = new URL(req.url)
  const pathname = requestUrl.pathname

  // Si no es una ruta de admin, continuar sin cambios
  if (!pathname.startsWith('/admin')) {
    return res
  }

  try {
    console.log("Verificando sesión...")
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error al verificar la sesión:", error.message)
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    console.log("Estado de la sesión:", session ? "Activa" : "Inactiva")
    if (session) {
      console.log("Detalles de la sesión:", {
        user: session.user.email,
        expires_at: session.expires_at
      })
    }

    // Si estamos en /admin/login y hay sesión, redirigir al dashboard
    if (pathname === '/admin/login' && session) {
      console.log("Redirigiendo al dashboard desde login...")
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Si no hay sesión y no estamos en login, redirigir a login
    if (!session && pathname !== '/admin/login') {
      console.log("Redirigiendo a login...")
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    console.log("Continuando con la solicitud...")
    return res
  } catch (error) {
    console.error("Error en el middleware:", error)
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
}

// Configurar el matcher para que solo se ejecute en rutas de admin
export const config = {
  matcher: [
    '/admin/:path*',
    '/admin/login'
  ]
} 