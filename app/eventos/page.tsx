import { getEvents } from "@/lib/actions"
import { EventCard } from "@/components/event-card"
import EventsCalendar2 from "@/components/calendar-section2"
import { EventCard2 } from "@/components/card-evento"
import EventsCalendar from "@/components/calendar-section"
import { Separator } from "@/components/ui/separator"

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Próximos Eventos</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          No te pierdas nuestras próximas fiestas. Consulta el calendario y asegura tu entrada.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay eventos programados actualmente. Vuelve pronto para ver nuestras próximas fechas.
          </p>
        </div>
      )}

      <div className="section-spacing">
        <span className="text-2xl font-bold">Opcion 1 Eventos</span>
        <EventsCalendar />
      </div>

      <div className="section-spacing grid grid-cols-1 md:grid-cols-2 gap-6">
        <span className="text-2xl font-bold">Opcion 2 Eventos</span>
        <Separator className="section-spacing"/>
        <EventCard2 />
        <EventCard2 />
      </div>

      <div className="section-spacing">
        <span className="text-2xl font-bold">Opcion 3 Calendario</span>
        <EventsCalendar2 />
      </div>
    </div>
  )
}
