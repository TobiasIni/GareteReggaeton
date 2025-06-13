export interface Event {
  id: number
  title: string
  description: string | null
  date: string
  location: string | null
  ticket_url: string | null
  image_url: string | null
  price: number | null
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string | null
  image_url: string
  alt_text: string | null
  event_id: number | null
  created_at: string
}
