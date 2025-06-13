"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import type { GalleryImage, Event } from "@/lib/types"

interface EditImagePageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditImagePage({ params }: EditImagePageProps) {
  const router = useRouter()
  const resolvedParams = use(params)

  const [image, setImage] = useState<GalleryImage | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Redirigir si el parámetro es "new" (esto debería manejarse por la ruta estática)
  useEffect(() => {
    if (resolvedParams.id === "new") {
      router.push("/admin/gallery/new")
      return
    }

    async function loadData() {
      try {
        const supabase = createClientSupabaseClient()
        
        // Cargar imagen y eventos en paralelo
        const [imageResult, eventsResult] = await Promise.all([
          supabase.from("gallery").select("*").eq("id", resolvedParams.id).single(),
          supabase.from("events").select("*").order("date", { ascending: false })
        ])

        if (imageResult.error) throw imageResult.error
        if (eventsResult.error) throw eventsResult.error

        setImage(imageResult.data)
        setEvents(eventsResult.data || [])
        setSelectedEventId(imageResult.data.event_id?.toString() || "none")
      } catch (err) {
        setError("Error al cargar la información")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [resolvedParams.id, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!image) return

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const supabase = createClientSupabaseClient()
      const imageData = {
        title: formData.get("title") as string,
        image_url: formData.get("image_url") as string,
        alt_text: formData.get("alt_text") as string,
        event_id: selectedEventId === "none" ? null : Number.parseInt(selectedEventId),
      }

      const { error } = await supabase.from("gallery").update(imageData).eq("id", resolvedParams.id)

      if (error) throw error

      router.push("/admin/gallery")
      router.refresh()
    } catch (err) {
      console.error("Error updating image:", err)
      setError("Ha ocurrido un error al actualizar la imagen. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!image || !confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return

    setIsDeleting(true)
    setError(null)

    try {
      const supabase = createClientSupabaseClient()
      const { error } = await supabase.from("gallery").delete().eq("id", resolvedParams.id)

      if (error) throw error

      router.push("/admin/gallery")
      router.refresh()
    } catch (err) {
      console.error("Error deleting image:", err)
      setError("Ha ocurrido un error al eliminar la imagen. Por favor, inténtalo de nuevo.")
    } finally {
      setIsDeleting(false)
    }
  }

  const isValidId = resolvedParams.id !== "new" && resolvedParams.id.trim() !== ""

  if (!isValidId) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/admin/gallery" className="flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Volver a galería
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ID de imagen inválido</h1>
          <p className="text-muted-foreground">El ID de la imagen no es válido.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Cargando imagen...</div>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Imagen no encontrada</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/admin/gallery" className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Volver a galería
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={image.image_url || "/placeholder.svg"}
                alt={image.alt_text || "Imagen de galería"}
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editar Imagen</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de la Imagen *</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://..."
                  defaultValue={image.image_url}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Título descriptivo de la imagen"
                  defaultValue={image.title || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt_text">Texto Alternativo</Label>
                <Input
                  id="alt_text"
                  name="alt_text"
                  placeholder="Descripción para accesibilidad"
                  defaultValue={image.alt_text || ""}
                />
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
                  Selecciona el evento al que pertenece esta imagen.
                </p>
              </div>

              {error && <div className="text-destructive text-sm">{error}</div>}

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Actualizando..." : "Actualizar Imagen"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/gallery">Cancelar</Link>
                </Button>
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}
