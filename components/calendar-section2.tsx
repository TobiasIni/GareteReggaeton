"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EventCard2 } from "@/components/card-evento"
import type { Event } from "@/lib/types"

// Dummy events for preview
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
  },
  {
    id: 3,
    title: "Gare7e: Noche de Reggaeton Clásico",
    description: "Los mejores temas del reggaeton de los 2000",
    date: "2027-05-15T23:00:00.000Z",
    location: "Sala Gare7e, Madrid",
    ticket_url: "#",
    image_url: "/logoGarete.png",
    price: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const EventsCalendar2 = () => {
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
        const typedData = data.map(event => ({
          id: Number(event.id),
          title: String(event.title),
          description: event.description ? String(event.description) : null,
          date: String(event.date),
          location: event.location ? String(event.location) : null,
          ticket_url: event.ticket_url ? String(event.ticket_url) : null,
          image_url: event.image_url ? String(event.image_url) : null,
          price: event.price ? Number(event.price) : null,
          created_at: String(event.created_at),
          updated_at: String(event.updated_at)
        }));
        setEvents(typedData);
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
  const CARD_FRACTION = 1 / 2; // For 1/3 of the screen width
  const GAP_PX = 12; // Equivalent to Tailwind's gap-6

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
      // Find the first future event to center
      const firstFutureEvent = sortedEvents.find(event => new Date(event.date) >= today);
      if (firstFutureEvent) {
        const indexToCenter = sortedEvents.indexOf(firstFutureEvent);
        const containerWidth = carouselRef.current.offsetWidth;
        const scrollOffset = (containerWidth / 2) - (calculatedCardWidth / 2);

        carouselRef.current.scrollTo({
          left: (fullCardScrollAmount * indexToCenter) - scrollOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [sortedEvents, fullCardScrollAmount, calculatedCardWidth, carouselWidth, today]);

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
      <div className="carousel-container">
        <div className="text-center py-8">
          <p className="text-white">No hay eventos programados en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <div className="carousel-title text-red-600">Nuestros Eventos</div>
      <div className="carousel-subtitle">Revive la mejor música y únete a la fiesta</div>
      
      <div className="relative w-full">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background/90"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          ref={carouselRef}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 scrollbar-hide px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedEvents.map((event) => {
            const isPastEvent = new Date(event.date) < today;
            return (
              <div
                key={event.id}
                className="flex-none snap-start transition-all duration-300"
                style={{ width: `${calculatedCardWidth}px` }}
              >
                <EventCard2 event={event} isPastEvent={isPastEvent} />
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
    </div>
  );
};

export default EventsCalendar2; 