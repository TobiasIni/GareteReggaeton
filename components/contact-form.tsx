"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Simulación de envío de formulario
    try {
      // Aquí iría la lógica real de envío
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)(
        // Resetear el formulario
        event.target as HTMLFormElement,
      ).reset()
    } catch (err) {
      setError("Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Contacta con nosotros</CardTitle>
        <CardDescription>Envíanos un mensaje y te responderemos lo antes posible.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input id="subject" name="subject" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          {error && <div className="text-destructive text-sm">{error}</div>}
          {isSuccess && (
            <div className="text-green-600 text-sm">
              ¡Mensaje enviado correctamente! Te responderemos lo antes posible.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
