import { Hero } from "@/components/hero"
import EventsCalendar from "@/components/calendar-section"
import { getUpcomingEvents } from "@/lib/actions"
import EventsCalendar2 from "@/components/calendar-section2"
import SpotifySectionV3 from "@/components/spotify-section-V3"
import { SplashScreen } from "@/components/splash-screen"

export default async function Home() {
  const events = await getUpcomingEvents()

  return (
    <>
      <SplashScreen />
      <div className="space-y-8">
        <Hero />
        <div className="w-full px-8 md:px-16 lg:px-15 xl:px-24">
          <EventsCalendar 
            variant="home"
            showTitle={false}
            showSubtitle={false}
            className="bg-transparent"
          />
        </div>
        <div className="container mx-auto px-4">
          <SpotifySectionV3 />
        </div>
      </div>
    </>
  )
}
