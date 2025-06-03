import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarIcon, MapPinIcon, TicketIcon, Clock, ArrowLeft } from "lucide-react"
import { getEventById } from "@/lib/actions"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(Number.parseInt(params.id))

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/eventos" className="flex items-center text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16} className="mr-2" />
        Volver a eventos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={event.image_url || "/placeholder.svg?height=600&width=800"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-primary" size={20} />
              <span>{formatDateTime(event.date)}</span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="text-primary" size={20} />
                <span>{event.location}</span>
              </div>
            )}

            {event.price !== null && (
              <div className="flex items-center gap-2">
                <TicketIcon className="text-primary" size={20} />
                <span>{event.price.toFixed(2)} €</span>
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert mb-8">
            <p>{event.description || "Únete a la mejor fiesta de reggaeton viejo."}</p>
          </div>

          <Button asChild size="lg">
            <Link href={event.ticket_url || "#"}>Comprar Entradas</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Información del Evento</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Horario</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>Apertura de puertas: 22:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>Inicio del evento: 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>Fin del evento: 05:00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Información Adicional</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>Evento para mayores de 18 años</li>
              <li>Se requiere DNI para la entrada</li>
              <li>Prohibido fumar en el interior</li>
              <li>La organización se reserva el derecho de admisión</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
