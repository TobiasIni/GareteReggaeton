"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { addGalleryImage } from "@/lib/actions"
import { createClientSupabaseClient } from "@/lib/supabase"
import type { Event } from "@/lib/types"

export default function NewImagePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("none")

  // Cargar eventos disponibles
  useEffect(() => {
    async function loadEvents() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: false })

        if (error) throw error
        setEvents(data || [])
      } catch (err) {
        console.error("Error loading events:", err)
      }
    }
    loadEvents()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      const imageData = {
        title: formData.get("title") as string,
        image_url: formData.get("image_url") as string,
        alt_text: formData.get("alt_text") as string,
        event_id: selectedEventId === "none" ? null : Number.parseInt(selectedEventId),
      }

      await addGalleryImage(imageData)
      router.push("/admin/gallery")
      router.refresh()
    } catch (err) {
      console.error("Error adding image:", err)
      setError("Ha ocurrido un error al añadir la imagen. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/admin/gallery" className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Volver a galería
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nueva Imagen</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">URL de la Imagen *</Label>
              <Input id="image_url" name="image_url" type="url" placeholder="https://..." required />
              <p className="text-sm text-muted-foreground">
                Sube tu imagen a un servicio como Imgur, Cloudinary o similar y pega aquí la URL.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" placeholder="Título descriptivo de la imagen" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alt_text">Texto Alternativo</Label>
              <Input id="alt_text" name="alt_text" placeholder="Descripción para accesibilidad" />
              <p className="text-sm text-muted-foreground">
                Describe brevemente el contenido de la imagen para usuarios con discapacidad visual.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_id">Evento</Label>
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un evento (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin asignar a evento</SelectItem>
                  {events.map((event) => {
                    const eventDate = new Date(event.date)
                    return (
                      <SelectItem key={event.id} value={event.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">{event.title}</span>
                          <span className="text-sm text-muted-foreground">
                            ({eventDate.toLocaleDateString("es-ES")})
                          </span>
                          {event.location && (
                            <>
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs text-muted-foreground">{event.location}</span>
                            </>
                          )}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Selecciona el evento al que pertenece esta imagen. Esto permitirá filtrar las fotos por fiesta en la galería.
              </p>
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Añadiendo..." : "Añadir Imagen"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/gallery">Cancelar</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
