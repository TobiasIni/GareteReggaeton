"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteGalleryImage } from "@/lib/actions"

interface DeleteImageButtonProps {
  imageId: number
}

export function DeleteImageButton({ imageId }: DeleteImageButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return

    setIsDeleting(true)

    try {
      await deleteGalleryImage(imageId)
      router.refresh()
    } catch (err) {
      console.error("Error deleting image:", err)
      alert("Ha ocurrido un error al eliminar la imagen.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
      <Trash className="h-4 w-4" />
      <span className="sr-only">Eliminar</span>
    </Button>
  )
}
