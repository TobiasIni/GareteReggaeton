"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Ticket, ChevronLeft, ChevronRight } from "lucide-react"

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  ticketUrl: string
  price: string
  imageUrl?: string
}

type SupabaseEvent = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  ticket_url: string
  price: string
  image_url?: string
}

// Dummy events for preview (ensure some are in the past, and some in the future for testing)
const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Fiesta Retro de los 80s",
    date: "2025-05-29", // Past event
    time: "21:00",
    location: "Centro Cultural, CABA",
    description: "Revive la mejor música de los 80s en esta increíble fiesta temática.",
    ticketUrl: "https://example.com/tickets-retro",
    price: "10.000 ARS",
    imageUrl: "/logoGarete.png"
  },
  {
    id: "2",
    title: "Gare7e: Edición Especial",
    date: "2025-06-03", // Future event (current in this context, today is June 1, 2025)
    time: "23:00",
    location: "Palermo, Buenos Aires",
    description: "Una noche especial con los mejores temas del reggaeton viejo.",
    ticketUrl: "https://example.com/tickets-garete",
    price: "15.000 ARS",
    imageUrl: "/bannerGarete.png"
  },
  {
    id: "3",
    title: "Noche de Jazz & Blues",
    date: "2025-05-08", // Past event
    time: "20:30",
    location: "The Jazz Club, San Telmo",
    description: "Disfruta de una velada íntima con lo mejor del jazz y blues en vivo.",
    ticketUrl: "https://example.com/tickets-jazz",
    price: "8.000 ARS",
    imageUrl: "/logoGarete.png"
  },
  {
    id: "4",
    title: "Conferencia Tech Innovate",
    date: "2025-05-27", // Past event
    time: "10:00",
    location: "Centro de Exposiciones, Vicente López",
    description: "Explora las últimas tendencias y avances tecnológicos con expertos de la industria.",
    ticketUrl: "https://example.com/tickets-tech",
    price: "Gratis",
    imageUrl: "/logoGarete.png"
  },
  {
    id: "5",
    title: "Festival Gastronómico",
    date: "2025-05-28", // Past event
    time: "12:00",
    location: "Parque Centenario, CABA",
    description: "Una experiencia culinaria con los mejores food trucks y chefs de la ciudad.",
    ticketUrl: "https://example.com/tickets-gastro",
    price: "5.000 ARS",
    imageUrl: "/logoGarete.png"
  },
];

const EventsCalendar = () => {
  const [events, setEvents] = useState<Event[]>(dummyEvents);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to fetch events from Supabase
  const fetchEvents = async () => {
    try {
      const supabase = createClientSupabaseClient();

      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }

      if (data && data.length > 0) {
        const mappedEvents = (data as SupabaseEvent[]).map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          ticketUrl: event.ticket_url,
          price: event.price,
          imageUrl: event.image_url,
        }));
        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const today = new Date("2025-06-01T00:00:00.000Z"); // Fixed date for consistent testing
  // Use new Date() for actual dynamic current date:
  // const today = new Date();
  // today.setHours(0, 0, 0, 0); // Normalize today's date to compare only dates

  const sortedEvents = useMemo(() => {
    const currentAndFutureEvents: Event[] = [];
    const pastEvents: Event[] = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate >= today) {
        currentAndFutureEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    });

    // Sort current/future events by date ascending
    currentAndFutureEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Sort past events by date ascending (oldest first)
    pastEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let finalOrder: Event[] = [];
    const firstCurrentEvent = currentAndFutureEvents.length > 0 ? currentAndFutureEvents[0] : undefined;

    if (firstCurrentEvent) {
      // Find index of the first current event to remove it from currentAndFutureEvents
      const currentEventIndex = currentAndFutureEvents.indexOf(firstCurrentEvent);
      if (currentEventIndex > -1) {
        currentAndFutureEvents.splice(currentEventIndex, 1);
      }

      // Order: Past events (oldest to most recent), then the first current event, then other future events
      finalOrder = [...pastEvents, firstCurrentEvent, ...currentAndFutureEvents];
    } else {
      // If no current/future events, just show past events (oldest to most recent)
      finalOrder = pastEvents;
    }

    return finalOrder;
  }, [events, today]);

  // Define card dimensions and gap based on 1/3 screen width
  const CARD_FRACTION = 1 / 3; // For 1/3 of the screen width
  const GAP_PX = 24; // Equivalent to Tailwind's gap-6

  // Use a state to store carousel width to calculate dynamic card width
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };
    updateWidth(); // Set initial width
    window.addEventListener('resize', updateWidth); // Update on resize
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate actual card width for rendering and scrolling
  const calculatedCardWidth = carouselWidth > 0 ? (carouselWidth * CARD_FRACTION) - (GAP_PX * (1 - CARD_FRACTION)) : 0;
  const fullCardScrollAmount = calculatedCardWidth + GAP_PX; // Full amount to scroll for one card including gap

  useEffect(() => {
    if (carouselRef.current && sortedEvents.length > 0 && calculatedCardWidth > 0) {
      // Find the index of the "Gare7e" event, which is the "active" one we want to center
      const activeEventId = "2"; // Assuming "Gare7e" has ID "2"
      const indexToCenter = sortedEvents.findIndex(event => event.id === activeEventId);

      if (indexToCenter !== -1) {
        const containerWidth = carouselRef.current.offsetWidth;
        // Calculate the offset to center the card.
        const scrollOffset = (containerWidth / 2) - (calculatedCardWidth / 2);

        // Scroll to the calculated position
        carouselRef.current.scrollTo({
          left: (fullCardScrollAmount * indexToCenter) - scrollOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [sortedEvents, fullCardScrollAmount, calculatedCardWidth, carouselWidth]); // Added calculatedCardWidth, carouselWidth

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const newScrollPosition = direction === 'left'
        ? carouselRef.current.scrollLeft - fullCardScrollAmount
        : carouselRef.current.scrollLeft + fullCardScrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay eventos programados en este momento.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 md:px-8 lg:px-16 xl:px-20">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background/90"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        ref={carouselRef}
        // Re-added gap-6 to visually separate cards
        className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sortedEvents.map((event) => {
          const isPastEvent = new Date(event.date) < today;
          return (
            <div
              key={event.id}
              className={`group relative flex-none snap-start overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300
                ${isPastEvent ? "opacity-60 grayscale" : "hover:scale-105 hover:shadow-2xl"}
                `}
              // Set dynamic width based on carouselWidth state
              style={{ width: `${calculatedCardWidth}px` }}
            >
              <Link href={event.ticketUrl} className="block h-full" prefetch={false}>
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    // Adjust image width to match new card size
                    width={Math.round(calculatedCardWidth)} // Round to nearest pixel
                    height={400} // Keep original height ratio or adjust as needed
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  {isPastEvent && ( // Conditionally render Sold Out tag
                    <span className="absolute bottom-4 left-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white shadow-md">
                      Sold Out
                    </span>
                  )}
                </div>
                <div className="space-y-6 p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary px-4 py-2 text-base font-medium text-primary-foreground">
                      {event.price}
                    </span>
                    <span className="text-base text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-card-foreground transition-colors duration-300 group-hover:text-primary">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-base text-muted-foreground">{event.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground">
                      {event.time}
                    </span>
                    <span className="rounded-full bg-secondary px-4 py-2 text-base font-medium text-secondary-foreground">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link
                      href={event.ticketUrl}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      prefetch={false}
                    >
                      <Ticket className="h-5 w-5" />
                      Comprar Entradas
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background/90"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default EventsCalendar;