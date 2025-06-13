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
        
        {/* Sección de Eventos con animación */}
        <div className="w-full px-8 md:px-16 lg:px-15 xl:px-24 opacity-0 translate-y-10 animate-fade-in-up">
          {/* Título de la sección */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-6 title-glow">
              Nuestras Próximas Fiestas
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full shadow-lg shadow-red-500/50"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              No te duermas, sacá tu entrada
            </p>
          </div>
          
          <EventsCalendar 
            variant="home"
            showTitle={false}
            showSubtitle={false}
            className="bg-transparent"
          />
        </div>
        
        {/* Sección de Spotify con animación */}
        <div className="container mx-auto px-4 opacity-0 translate-y-10 animate-fade-in-up-delay">
          {/* Título de la sección */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-6 title-glow">
              Nuestra Música
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full shadow-lg shadow-red-500/50"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              Escucha los ritmos que definen nuestras fiestas
            </p>
          </div>
          
          <SpotifySectionV3 />
        </div>
      </div>
    </>
  )
}
