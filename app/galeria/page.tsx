import { getGalleryImages } from "@/lib/actions"
import { GalleryGrid } from "@/components/gallery-grid"

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Galería</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revive los mejores momentos de nuestras fiestas a través de estas imágenes.
        </p>
      </div>

      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay imágenes disponibles actualmente. Vuelve pronto para ver nuestra galería.
          </p>
        </div>
      )}
    </div>
  )
}
