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
            <span className="text-2xl font-bold">A definir Opcion</span>
            <EventsCalendar2/>
          </div>

          <span className="text-2xl font-bold">Opcion 1 Seccion Spotify</span>
          <div className="section-spacing">
            <SpotifySection />
          </div>
          <span className="text-2xl font-bold">Opcion 2 Seccion Spotify</span>
          <div className="section-spacing">
            <SpotifySectionV2 />
          </div>
          <span className="text-2xl font-bold">Opcion 3 Seccion Spotify</span>
          <div className="section-spacing">
            <SpotifySectionV3 />
          </div>
          <span className="text-2xl font-bold">Opcion 1 Formulario de Contacto</span>
          <div className="section-spacing">
            <ContactCta />
          </div>
          <span className="text-2xl font-bold">Opcion 2 Formulario de Contacto</span>
          <div className="section-spacing">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
