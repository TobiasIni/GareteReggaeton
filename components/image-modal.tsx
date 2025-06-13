"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import type { GalleryImage } from "@/lib/types"

interface ImageModalProps {
  images: GalleryImage[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrevious, goToNext, onClose])

  const currentImage = images[currentIndex]

  if (!isOpen || !currentImage) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Overlay para cerrar */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Contenido del modal */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm border border-white/20"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        {/* Imagen principal */}
        <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
          <Image
            src={currentImage.image_url || "/logoGarete.png"}
            alt={currentImage.alt_text || "Imagen"}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        {/* Información de la imagen */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {currentImage.title && (
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {currentImage.title}
                  </h3>
                )}
                <p className="text-gray-300 text-sm">
                  Imagen {currentIndex + 1} de {images.length}
                </p>
              </div>
              
              {/* Botones de acción */}
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentImage.image_url)
                    // Aquí podrías mostrar una notificación
                  }}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Copiar enlace"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                
                <a
                  href={currentImage.image_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Descargar imagen"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de progreso */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-red-600 scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 