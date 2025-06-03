import Link from "next/link"
import Image from "next/image"
import { getGalleryImages } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Edit } from "lucide-react"
import { DeleteImageButton } from "@/components/delete-image-button"

export default async function AdminGalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Galería</h1>
          <p className="text-muted-foreground">Administra las imágenes de la galería de Gare7e.</p>
        </div>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Imagen
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Imágenes de la Galería</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.alt_text || "Imagen de galería"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/admin/gallery/${image.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>
                      <DeleteImageButton imageId={image.id} />
                    </div>
                  </div>
                  {image.title && (
                    <div className="mt-2">
                      <p className="text-sm font-medium truncate">{image.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay imágenes disponibles. Sube tu primera imagen.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
