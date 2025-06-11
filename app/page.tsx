import { Hero } from "@/components/hero"
import { SpotifySection } from "@/components/spotify-section"
import EventsCalendar from "@/components/calendar-section"
import { getUpcomingEvents } from "@/lib/actions"
import { ContactForm } from "@/components/contact-form"
import ContactCta from "@/components/contact-hero"
import { EventCard2 } from "@/components/card-evento"
import EventsCalendar2 from "@/components/calendar-section2"
import SpotifySectionV2 from "@/components/spotify-section-v2"
import SpotifySectionV3 from "@/components/spotify-section-V3"
import { SplashScreen } from "@/components/splash-screen"

export default async function Home() {
  const events = await getUpcomingEvents()

  return (
    <>
      <SplashScreen />
      <div className="space-y-8">
        <Hero />
        <div className="section-spacing">
          <div className="section-spacing">
            <span className="text-2xl font-bold text-white">A definir Opcion Spotify</span>
            <EventsCalendar2/>
          </div>

          <span className="text-2xl font-bold text-white">Opcion 3 Seccion Spotify</span>
          <div className="section-spacing">
            <SpotifySectionV3 />
          </div>
        </div>
      </div>
    </>
  )
}
