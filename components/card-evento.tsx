import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/types";

// Eventos hardcodeados para pruebas
const dummyEvents: Event[] = [
  {
    id: 1,
    title: "Gare7e: Noche de Reggaeton Viejo",
    description: "La mejor fiesta de reggaeton viejo en Madrid",
    date: "2024-04-20T23:00:00.000Z",
    location: "Sala Gare7e, Madrid",
    ticket_url: "#",
    image_url: "/logoGarete.png",
    price: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Gare7e: Especial Daddy Yankee",
    description: "Tribute a Daddy Yankee con los mejores éxitos",
    date: "2024-05-01T23:00:00.000Z",
    location: "Sala Gare7e, Madrid",
    ticket_url: "#",
    image_url: "/logoGarete.png",
    price: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

interface EventCardProps {
  event?: Event;
}

export function EventCard2({ event = dummyEvents[0] }: EventCardProps) {
  return (
    <Card className="overflow-hidden event-card glass-card group relative cursor-pointer">
      {/* Event Image */}
      <div className="aspect-[16/9] relative">
        <Image
          src={event.image_url || "/logoGarete.png"}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay for blur and content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-filter transition-all duration-300 group-hover:backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center p-4">
          <div className="text-white text-center">
            {/* Event Title (always visible in a more prominent way on hover) */}
            <h3 className="text-2xl font-bold mb-4">{event.title}</h3>

            {/* Event details on hover */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-lg">
                <CalendarIcon size={20} />
                <time dateTime={event.date}>{formatDate(event.date)}</time>
              </div>
              {event.location && (
                <div className="flex items-center justify-center gap-2 text-lg">
                  <MapPinIcon size={20} />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* Buy Ticket Button on hover */}
            <Button asChild className="mt-6">
              <Link href={event.ticket_url || "#"}>
                <TicketIcon size={18} className="mr-2" />
                Comprar Entradas
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Card Header with Title */}
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold line-clamp-1">{event.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}