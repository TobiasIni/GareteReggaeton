import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden event-card glass-card">
      <div className="aspect-[16/9] relative">
        <Image
          src={event.image_url || "/placeholder.svg?height=400&width=600"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <CalendarIcon size={16} />
          <time dateTime={event.date}>{formatDate(event.date)}</time>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPinIcon size={16} />
            <span>{event.location}</span>
          </div>
        )}
        <p className="text-muted-foreground line-clamp-3">
          {event.description || "Únete a la mejor fiesta de reggaeton viejo."}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
        {event.price ? <span className="font-bold">{event.price.toFixed(2)} €</span> : <span>Entrada libre</span>}
        <Button asChild>
          <Link href={event.ticket_url || "#"}>
            <TicketIcon size={16} className="mr-2" />
            Comprar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
