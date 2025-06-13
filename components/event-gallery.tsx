"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, MapPin } from "lucide-react"
import { ImageModal } from "./image-modal"
import type { Event, GalleryImage } from "@/lib/types"

interface EventGalleryProps {
  eventGalleries: { event: Event; images: GalleryImage[] }[]
  driveUrl?: string
}

const EventGallery = ({ eventGalleries, driveUrl }: EventGalleryProps) => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  // Obtener todas las imágenes de todos los eventos usando useMemo para evitar recálculos
  const allImages = useMemo(() => {
    return eventGalleries.flatMap(eg => eg.images)
  }, [eventGalleries])

  // Calcular imágenes filtradas y evento actual usando useMemo
  const { filteredImages, currentEvent } = useMemo(() => {
    if (selectedEventId === null) {
      return {
        filteredImages: allImages,
        currentEvent: null
      }
    } else {
      const eventGallery = eventGalleries.find(eg => eg.event.id === selectedEventId)
      return {
        filteredImages: eventGallery?.images || [],
        currentEvent: eventGallery?.event || null
      }
    }
  }, [selectedEventId, eventGalleries, allImages])

  const openModal = (index: number) => {
    setModalImageIndex(index)
    setModalOpen(true)
  }

  if (!eventGalleries || eventGalleries.length === 0) {
    return (
      <div className="carousel-container">
        <div className="text-center py-12">
          <h2 className="carousel-title text-red-600">Galería de Eventos</h2>
          <p className="text-white">No hay imágenes disponibles en este momento.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="carousel-container">
      <div className="carousel-title text-red-600">Galería de Eventos</div>
      <div className="carousel-subtitle">Revive los mejores momentos de nuestras fiestas</div>
      
      {/* Filtros por evento */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedEventId(null)}
            className={`event-filter-button ${selectedEventId === null ? 'active' : ''}`}
          >
            Todas las fotos ({allImages.length})
          </button>
          
          {eventGalleries.map(({ event, images }) => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`event-filter-button ${selectedEventId === event.id ? 'active' : ''}`}
            >
              {event.title} ({images.length})
            </button>
          ))}
        </div>
        
        {/* Información del evento seleccionado */}
        {currentEvent && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {new Date(currentEvent.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              {currentEvent.location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{currentEvent.location}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Galería de imágenes estilo grid */}
      <div className="mb-8">
        {filteredImages.length > 0 ? (
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-grid-item"
                onClick={() => openModal(index)}
              >
                <Image
                  src={image.image_url || "/logoGarete.png"}
                  alt={image.alt_text || `Foto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
                
                {/* Overlay con información */}
                <div className="image-overlay absolute inset-0">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {image.title && (
                      <p className="text-white text-sm font-medium truncate">
                        {image.title}
                      </p>
                    )}
                    <p className="text-gray-300 text-xs mt-1">
                      Foto {index + 1} de {filteredImages.length}
                    </p>
                  </div>
                </div>

                {/* Indicador de hover */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="loading-spinner opacity-0 group-hover:opacity-100 transition-opacity delay-300"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">No hay imágenes para mostrar</p>
          </div>
        )}
      </div>

      {/* Información de la galería actual */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
          <span className="text-white text-sm">
            Mostrando <span className="text-red-400 font-bold">{filteredImages.length}</span> fotos
            {currentEvent ? ` de ${currentEvent.title}` : ' de todos los eventos'}
          </span>
        </div>
      </div>

      {/* Botón de Google Drive */}
      {driveUrl && (
        <div className="text-center">
          <Link
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-red-500/20"
          >
            <ExternalLink className="h-5 w-5" />
            Ver más fotos en Google Drive
          </Link>
        </div>
      )}

      {/* Modal de imagen */}
      <ImageModal
        images={filteredImages}
        initialIndex={modalImageIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

export default EventGallery 