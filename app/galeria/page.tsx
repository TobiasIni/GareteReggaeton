import { getGalleryImagesByEvent, getUnassignedGalleryImages } from "@/lib/actions"
import EventGallery from "@/components/event-gallery"
import { GalleryGrid } from "@/components/gallery-grid"

export default async function GalleryPage() {
  const eventGalleries = await getGalleryImagesByEvent()

  // TODO: Cambiar esta URL por tu carpeta real de Google Drive
  // Ejemplo: "https://drive.google.com/drive/folders/1ABC123XYZ456"
  const driveUrl = "https://drive.google.com/drive/folders/tu-carpeta-de-fotos"

  // Si no hay eventos con imágenes, crear un evento ficticio para mostrar todas las imágenes
  if (eventGalleries.length === 0) {
    const unassignedImages = await getUnassignedGalleryImages()
    
    if (unassignedImages.length > 0) {
      // Crear un evento ficticio para que funcione con EventGallery
      const fakeEventGallery = [{
        event: {
          id: 0,
          title: "Galería General",
          description: "Fotos de nuestros eventos",
          date: new Date().toISOString(),
          location: "Madrid",
          ticket_url: null,
          image_url: null,
          price: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        images: unassignedImages
      }]
      
      return (
        <div className="min-h-screen py-16">
          <EventGallery 
            eventGalleries={fakeEventGallery} 
            driveUrl={driveUrl}
          />
        </div>
      )
    }
    
    return (
      <div className="min-h-screen py-16">
        <div className="carousel-container">
          <div className="text-center py-12">
            <h2 className="carousel-title text-red-600">Galería de Eventos</h2>
            <p className="text-white">No hay imágenes disponibles en este momento.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <EventGallery 
        eventGalleries={eventGalleries} 
        driveUrl={driveUrl}
      />
    </div>
  )
}
