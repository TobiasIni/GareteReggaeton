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
      setIsSuccess(true)
      ;(event.target as HTMLFormElement).reset()
    } catch (err) {
      setError("Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-black text-white border-red-600">
      <CardHeader>
        <CardTitle className="text-white">Contacta con nosotros</CardTitle>
        <CardDescription className="text-gray-400">Envíanos un mensaje y te responderemos lo antes posible.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nombre</Label>
              <Input 
                id="name" 
                name="name" 
                required 
                className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">Asunto</Label>
            <Input 
              id="subject" 
              name="subject" 
              required 
              className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">Mensaje</Label>
            <Textarea 
              id="message" 
              name="message" 
              rows={5} 
              required 
              className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {isSuccess && (
            <div className="text-green-500 text-sm">
              ¡Mensaje enviado correctamente! Te responderemos lo antes posible.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
