"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getEventById, updateEvent, deleteEvent } from "@/lib/actions"
import type { Event } from "@/lib/types"

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Validar que el ID sea un número válido
  const eventId = Number.parseInt(params.id)
  const isValidId = !isNaN(eventId) && eventId > 0

  // Redirigir si el parámetro es "new" (esto debería manejarse por la ruta estática)
  useEffect(() => {
    if (params.id === "new") {
      router.push("/admin/events/new")
      return
    }

    async function loadEvent() {
      if (isValidId) {
        try {
          const eventData = await getEventById(eventId)
          setEvent(eventData)
        } catch (err) {
          setError("Error al cargar el evento")
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    loadEvent()
  }, [eventId, isValidId, params.id, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!event) return

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const eventData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: new Date(formData.get("date") as string).toISOString(),
        location: formData.get("location") as string,
        ticket_url: formData.get("ticket_url") as string,
        image_url: formData.get("image_url") as string,
        price: formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null,
      }

      await updateEvent(eventId, eventData)
      router.push("/admin/events")
      router.refresh()
    } catch (err) {
      console.error("Error updating event:", err)
      setError("Ha ocurrido un error al actualizar el evento. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!event || !confirm("¿Estás seguro de que quieres eliminar este evento?")) return

    setIsDeleting(true)
    setError(null)

    try {
      await deleteEvent(eventId)
      router.push("/admin/events")
      router.refresh()
    } catch (err) {
      console.error("Error deleting event:", err)
      setError("Ha ocurrido un error al eliminar el evento. Por favor, inténtalo de nuevo.")
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isValidId) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/admin/events" className="flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Volver a eventos
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ID de evento inválido</h1>
          <p className="text-muted-foreground">El ID del evento debe ser un número válido.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Cargando evento...</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Evento no encontrado</div>
      </div>
    )
  }

  // Formatear la fecha para el input datetime-local
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/admin/events" className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Volver a eventos
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Editar Evento</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input id="title" name="title" defaultValue={event.title} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" rows={5} defaultValue={event.description || ""} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha y Hora *</Label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  defaultValue={formatDateForInput(event.date)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input id="location" name="location" defaultValue={event.location || ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (€)</Label>
                <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={event.price || ""} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticket_url">URL de Entradas</Label>
                <Input
                  id="ticket_url"
                  name="ticket_url"
                  type="url"
                  placeholder="https://..."
                  defaultValue={event.ticket_url || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="https://..."
                defaultValue={event.image_url || ""}
              />
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Actualizando..." : "Actualizar Evento"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/events">Cancelar</Link>
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
