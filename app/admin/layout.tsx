import type React from "react"
import { Inter, Montserrat } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminLayoutClient } from "@/app/admin/admin-layout-client"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export const metadata = {
  title: "Gare7e - Admin",
  description: "Panel de administración de Gare7e",
  generator: 'v0.dev'
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
} 