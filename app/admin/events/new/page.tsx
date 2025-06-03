"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { createEvent } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

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

      await createEvent(eventData)
      router.push("/admin/events")
      router.refresh()
    } catch (err) {
      console.error("Error creating event:", err)
      setError("Ha ocurrido un error al crear el evento. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/admin/events" className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Volver a eventos
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Nuevo Evento</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" name="description" rows={5} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha y Hora *</Label>
                <Input id="date" name="date" type="datetime-local" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input id="location" name="location" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (€)</Label>
                <Input id="price" name="price" type="number" step="0.01" min="0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticket_url">URL de Entradas</Label>
                <Input id="ticket_url" name="ticket_url" type="url" placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Creando..." : "Crear Evento"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/events">Cancelar</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
