import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Crear cliente de Supabase para el lado del servidor
export const createServerSupabaseClient = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Crear cliente de Supabase para el lado del cliente
export const createClientSupabaseClient = () => {
  return createClientComponentClient()
}
