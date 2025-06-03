"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { GalleryImage } from "@/lib/types"

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.image_url || "/placeholder.svg"}
              alt={image.alt_text || "Imagen de galería"}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal para ver imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
            <span className="sr-only">Cerrar</span>
          </button>
          <div className="relative w-full max-w-4xl max-h-[80vh]">
            <Image
              src={selectedImage.image_url || "/placeholder.svg"}
              alt={selectedImage.alt_text || "Imagen de galería"}
              width={1200}
              height={800}
              className="object-contain mx-auto max-h-[80vh]"
            />
            {selectedImage.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <p className="text-center">{selectedImage.title}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
