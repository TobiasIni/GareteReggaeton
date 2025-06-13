"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Ticket, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventsCalendarProps {
  variant?: 'default' | 'home'
  showTitle?: boolean
  showSubtitle?: boolean
  className?: string
}

const EventsCalendar = ({ 
  variant = 'default', 
  showTitle = true, 
  showSubtitle = true,
  className = ""
}: EventsCalendarProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Function to fetch events from Supabase
  const fetchEvents = async () => {
    try {
      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })

      if (error) {
        console.error("Error fetching events:", error)
        return
      }

      if (data) {
        // Los datos ya vienen con el tipo correcto desde Supabase
        setEvents(data as Event[])
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // Usar la fecha actual real en lugar de una fecha fija
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sortedEvents = useMemo(() => {
    const currentAndFutureEvents: Event[] = []
    const pastEvents: Event[] = []

    events.forEach(event => {
      const eventDate = new Date(event.date)
      if (eventDate >= today) {
        currentAndFutureEvents.push(event)
      } else {
        pastEvents.push(event)
      }
    })

    // Sort current/future events by date ascending
    currentAndFutureEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Sort past events by date ascending (oldest first)
    pastEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    let finalOrder: Event[] = []
    const firstCurrentEvent = currentAndFutureEvents.length > 0 ? currentAndFutureEvents[0] : undefined

    if (firstCurrentEvent) {
      // Find index of the first current event to remove it from currentAndFutureEvents
      const currentEventIndex = currentAndFutureEvents.indexOf(firstCurrentEvent)
      if (currentEventIndex > -1) {
        currentAndFutureEvents.splice(currentEventIndex, 1)
      }

      // Order: Past events (oldest to most recent), then the first current event, then other future events
      finalOrder = [...pastEvents, firstCurrentEvent, ...currentAndFutureEvents]
    } else {
      // If no current/future events, just show past events (oldest to most recent)
      finalOrder = pastEvents
    }

    return finalOrder
  }, [events, today])

  // Define card dimensions and gap based on variant
  const CARD_FRACTION = variant === 'home' ? 0.5 : 1 / 2 // 70% del ancho para home, más estético
  const GAP_PX = 24 // Equivalent to Tailwind's gap-6

  // Use a state to store carousel width to calculate dynamic card width
  const [carouselWidth, setCarouselWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth)
      }
    }
    updateWidth() // Set initial width
    window.addEventListener('resize', updateWidth) // Update on resize
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Calculate actual card width for rendering and scrolling
  const calculatedCardWidth = carouselWidth > 0 ? (carouselWidth * CARD_FRACTION) - (GAP_PX * (1 - CARD_FRACTION)) : 0
  const fullCardScrollAmount = calculatedCardWidth + GAP_PX // Full amount to scroll for one card including gap

  useEffect(() => {
    if (carouselRef.current && sortedEvents.length > 0 && calculatedCardWidth > 0) {
      // Find the first future event to center on
      const futureEventIndex = sortedEvents.findIndex(event => new Date(event.date) >= today)

      if (futureEventIndex !== -1) {
        const containerWidth = carouselRef.current.offsetWidth
        // Calculate the offset to center the card.
        const scrollOffset = (containerWidth / 2) - (calculatedCardWidth / 2)

        // Scroll to the calculated position
        carouselRef.current.scrollTo({
          left: (fullCardScrollAmount * futureEventIndex) - scrollOffset,
          behavior: 'smooth'
        })
        setCurrentScrollIndex(futureEventIndex)
      }
    }
  }, [sortedEvents, fullCardScrollAmount, calculatedCardWidth, carouselWidth, today])

  // Track scroll position for limit detection
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft
        const newIndex = Math.round(scrollPosition / fullCardScrollAmount)
        setCurrentScrollIndex(newIndex)
      }
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
      return () => carouselRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [fullCardScrollAmount])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      // Check limits before scrolling
      const canScrollLeft = currentScrollIndex > 0
      const canScrollRight = currentScrollIndex < sortedEvents.length - 1

      if ((direction === 'left' && !canScrollLeft) || (direction === 'right' && !canScrollRight)) {
        return // Don't scroll if at limit
      }

      const newScrollPosition = direction === 'left'
        ? carouselRef.current.scrollLeft - fullCardScrollAmount
        : carouselRef.current.scrollLeft + fullCardScrollAmount

      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  // Check if we can scroll in each direction
  const canScrollLeft = currentScrollIndex > 0
  const canScrollRight = currentScrollIndex < sortedEvents.length - 1

  if (loading) {
    const containerClass = variant === 'home' 
      ? `w-full ${className}` 
      : "carousel-container"
    
    return (
      <div className={containerClass}>
        <div className="text-center py-8">
          <p className="text-white">Cargando eventos...</p>
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    const containerClass = variant === 'home' 
      ? `w-full ${className}` 
      : "carousel-container"
    
    return (
      <div className={containerClass}>
        <div className="text-center py-8">
          <p className="text-white">No hay eventos programados en este momento.</p>
        </div>
      </div>
    )
  }

  const containerClass = variant === 'home' 
    ? `w-full ${className}` 
    : "carousel-container"

  return (
    <div className={containerClass}>
      {showTitle && (
        <div className="carousel-title text-red-600">Próximos Eventos</div>
      )}
      {showSubtitle && (
        <div className="carousel-subtitle">Descubre nuestras próximas fiestas y asegura tu entrada</div>
      )}
      
      <div className="relative w-full">
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background/90 ${
            !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={carouselRef}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedEvents.map((event) => {
            const isPastEvent = new Date(event.date) < today
            const eventDate = new Date(event.date)
            
            return (
              <div
                key={event.id}
                className={`group relative flex-none snap-start overflow-hidden transition-all duration-300 mx-auto
                  ${isPastEvent ? "opacity-60 grayscale" : "hover:scale-105"}
                  `}
                style={{ width: `${calculatedCardWidth}px` }}
              >
                {variant === 'home' ? (
                  // Diseño moderno para home
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
                    {/* Imagen del evento */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={event.image_url || "/logoGarete.png"}
                        alt={event.title}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                        width={Math.round(calculatedCardWidth)}
                        height={256}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {isPastEvent && (
                        <span className="absolute top-4 right-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white shadow-lg">
                          Sold Out
                        </span>
                      )}
                    </div>

                    {/* Contenido del evento */}
                    <div className="p-8 space-y-6">
                      {/* Fecha */}
                      <div className="text-center">
                        <span className="text-lg font-medium text-gray-300">
                          {eventDate.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Título con color rojo metálico */}
                      <div className="text-center">
                        <h3 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-400 group-hover:via-red-500 group-hover:to-red-600">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="mt-3 text-gray-400 text-center leading-relaxed">
                            {event.description}
                          </p>
                        )}
                      </div>

                      {/* Botones informativos */}
                      <div className="flex flex-col gap-3">
                        {/* Horario */}
                        <div className="flex items-center justify-center gap-3 bg-gray-800/50 rounded-full px-6 py-3 border border-gray-700/50">
                          <Clock className="h-5 w-5 text-red-500" />
                          <span className="text-white font-medium">
                            {eventDate.toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Ubicación */}
                        {event.location && (
                          <div className="flex items-center justify-center gap-3 bg-gray-800/50 rounded-full px-6 py-3 border border-gray-700/50">
                            <MapPin className="h-5 w-5 text-red-500" />
                            <span className="text-white font-medium">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Botón de comprar entrada con animación bounce */}
                      <div className="flex justify-center pt-4">
                        {event.ticket_url ? (
                          <Link
                            href={event.ticket_url}
                            className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 animate-bounce hover:animate-none"
                            prefetch={false}
                          >
                            <Ticket className="h-6 w-6 transition-transform group-hover/btn:rotate-12" />
                            <span className="text-lg">Comprar Entrada</span>
                          </Link>
                        ) : (
                          <div className="inline-flex items-center gap-3 bg-gray-600 text-white font-bold px-8 py-4 rounded-full cursor-not-allowed opacity-75">
                            <Ticket className="h-6 w-6" />
                            <span className="text-lg">Sin entradas disponibles</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Diseño original para la sección eventos
                  <div className="group relative flex-none snap-start overflow-hidden rounded-2xl bg-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="h-full">
                      <div className="relative h-80 w-full overflow-hidden">
                        <Image
                          src={event.image_url || "/logoGarete.png"}
                          alt={event.title}
                          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                          width={Math.round(calculatedCardWidth)}
                          height={400}
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        {isPastEvent && (
                          <span className="absolute bottom-4 left-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white shadow-md">
                            Sold Out
                          </span>
                        )}
                      </div>
                      <div className="space-y-6 p-8 bg-black text-white">
                        <div className="flex items-center justify-center">
                          <span className="text-base text-gray-300">
                            {eventDate.toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-red-600">
                            {event.title}
                          </h3>
                          <p className="mt-3 text-base text-gray-300">{event.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <span className="rounded-full bg-zinc-800 px-4 py-2 text-base font-medium text-white">
                            {eventDate.toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {event.location && (
                            <span className="rounded-full bg-zinc-800 px-4 py-2 text-base font-medium text-white">
                              {event.location}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          {event.ticket_url ? (
                            <Link
                              href={event.ticket_url}
                              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600"
                              prefetch={false}
                            >
                              <Ticket className="h-5 w-5" />
                              Comprar Entradas
                            </Link>
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-6 py-3 text-base font-medium text-white cursor-not-allowed">
                              <Ticket className="h-5 w-5" />
                              Sin entradas disponibles
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background/90 ${
            !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default EventsCalendar