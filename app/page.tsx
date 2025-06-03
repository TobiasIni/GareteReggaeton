import { Hero } from "@/components/hero"
import { SpotifySection } from "@/components/spotify-section"
import EventsCalendar from "@/components/calendar-section"
import { getUpcomingEvents } from "@/lib/actions"
import { ContactForm } from "@/components/contact-form"
import ContactCta from "@/components/contact-hero"
import { EventCard2 } from "@/components/card-evento"
import EventsCalendar2 from "@/components/calendar-section2"

export default async function Home() {
  const events = await getUpcomingEvents()

  return (
    <div className="space-y-8">
      <Hero />
      <div className="section-spacing">
        <EventsCalendar />
        <div className="section-spacing grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard2 />
          <EventCard2 />
        </div>
        <div className="section-spacing">
        <EventsCalendar2/>
      </div>
        <div className="section-spacing">
          <SpotifySection />
        </div>
        <div className="section-spacing">
          <ContactCta />
        </div>
      </div>
    </div>
  )
}
