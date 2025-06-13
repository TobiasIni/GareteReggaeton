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
      </div>
      
      <EventsCalendar />
      <EventsCalendar2 />
    </div>
  )
}
