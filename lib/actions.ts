"use server"

import { createServerSupabaseClient } from "./supabase"
import type { Event, GalleryImage } from "./types"
import { revalidatePath } from "next/cache"

// Acciones para eventos
export async function getEvents(): Promise<Event[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data || []
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return data || []
}

export async function getEventById(id: number): Promise<Event | null> {
  // Validar que el ID sea un número válido
  if (isNaN(id) || id <= 0) {
    console.error(`Invalid event ID: ${id}`)
    return null
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching event with id ${id}:`, error)
    return null
  }

  return data
}

export async function createEvent(eventData: Omit<Event, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("events")
    .insert([{ ...eventData, updated_at: new Date().toISOString() }])
    .select()

  if (error) {
    console.error("Error creating event:", error)
    throw new Error("Failed to create event")
  }

  revalidatePath("/admin/events")
  revalidatePath("/eventos")
  return data[0]
}

export async function updateEvent(id: number, eventData: Partial<Omit<Event, "id" | "created_at" | "updated_at">>) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("events")
    .update({ ...eventData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Error updating event with id ${id}:`, error)
    throw new Error("Failed to update event")
  }

  revalidatePath("/admin/events")
  revalidatePath("/eventos")
  revalidatePath(`/eventos/${id}`)
  return data[0]
}

export async function deleteEvent(id: number) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting event with id ${id}:`, error)
    throw new Error("Failed to delete event")
  }

  revalidatePath("/admin/events")
  revalidatePath("/eventos")
}

// Acciones para galería de imágenes
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }

  return data || []
}

export async function addGalleryImage(imageData: Omit<GalleryImage, "id" | "created_at">) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("gallery").insert([imageData]).select()

  if (error) {
    console.error("Error adding gallery image:", error)
    throw new Error("Failed to add gallery image")
  }

  revalidatePath("/admin/galeria")
  revalidatePath("/galeria")
  return data[0]
}

export async function deleteGalleryImage(id: string) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from("gallery").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting gallery image with id ${id}:`, error)
    throw new Error("Failed to delete gallery image")
  }

  revalidatePath("/admin/galeria")
  revalidatePath("/galeria")
}

// Función para obtener imágenes agrupadas por evento
export async function getGalleryImagesByEvent(): Promise<{ event: Event; images: GalleryImage[] }[]> {
  const supabase = createServerSupabaseClient()
  
  // Obtener eventos con imágenes
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false })

  if (eventsError) {
    console.error("Error fetching events:", eventsError)
    return []
  }

  // Obtener imágenes agrupadas por evento
  const eventGalleries = await Promise.all(
    (eventsData || []).map(async (event) => {
      const { data: images, error: imagesError } = await supabase
        .from("gallery")
        .select("*")
        .eq("event_id", event.id)
        .order("created_at", { ascending: true })

      if (imagesError) {
        console.error(`Error fetching images for event ${event.id}:`, imagesError)
        return { event, images: [] }
      }

      return { event, images: images || [] }
    })
  )

  // Obtener imágenes sin evento asignado
  const { data: unassignedImages, error: unassignedError } = await supabase
    .from("gallery")
    .select("*")
    .is("event_id", null)
    .order("created_at", { ascending: false })

  if (unassignedError) {
    console.error("Error fetching unassigned images:", unassignedError)
  }

  // Filtrar solo eventos que tengan imágenes
  const filteredGalleries = eventGalleries.filter(eventGallery => eventGallery.images.length > 0)
  
  // Si hay imágenes sin asignar, crear un evento "fake" para ellas
  if (unassignedImages && unassignedImages.length > 0) {
    const fakeEvent: Event = {
      id: -1,
      title: "Otras fotos",
      description: "Fotos sin asignar a ningún evento específico",
      date: new Date().toISOString().split('T')[0],
      location: null,
      ticket_url: null,
      price: null,
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    filteredGalleries.push({
      event: fakeEvent,
      images: unassignedImages
    })
  }
  
  return filteredGalleries
}

// Función para obtener imágenes sin evento asignado (como fallback)
export async function getUnassignedGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .is("event_id", null)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching unassigned gallery images:", error)
    return []
  }

  return data || []
}
