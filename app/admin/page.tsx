"use client"

import { useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClientSupabaseClient()
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido al Panel de Administración</CardTitle>
        </CardHeader>
        <CardContent>
          {user && (
            <p className="text-gray-600">
              Has iniciado sesión como: {user.email}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
