import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AtSign, MapPin, Phone, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ContactCta = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary/10 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contacto</h2>
          <p className="mb-8 text-muted-foreground">
            ¿Quieres organizar un evento? ¿Tienes alguna pregunta? Ponte en contacto con nosotros y te responderemos lo
            antes posible.
          </p>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-sm text-muted-foreground">+34 600 00 00 00</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <AtSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">info@gare7e.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-sm text-muted-foreground">Calle Principal 123, Madrid, España</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Asunto
              </label>
              <Input id="subject" placeholder="Asunto del mensaje" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
            </div>

            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactCta
