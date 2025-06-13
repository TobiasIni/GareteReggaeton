'use client'

import { useState, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { Plus, Trash2, Loader2, Upload, Edit, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import JSZip from 'jszip'

interface GalleryImage {
  id: string
  title: string
  image_url: string
  alt_text: string
  event_id: number | null
  created_at: string
}

interface Event {
  id: number
  title: string
  date: string
  location: string | null
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    checkTableStructure()
    loadData()
  }, [])

  const checkTableStructure = async () => {
    try {
      const { error } = await supabase
        .from('gallery')
        .select('id, title, image_url, alt_text, event_id, created_at')
        .limit(1)

      if (error) {
        console.error('Error checking table structure:', error.message)
        const { error: createError } = await supabase.rpc('create_gallery_table')
        if (createError) {
          console.error('Error creating table:', createError.message)
        }
      }
    } catch (error) {
      console.error('Error checking table structure:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const loadData = async () => {
    try {
      setError(null)
      
      // Cargar imágenes y eventos en paralelo
      const [imagesResult, eventsResult] = await Promise.all([
        supabase
          .from('gallery')
          .select('id, title, image_url, alt_text, event_id, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('events')
          .select('id, title, date, location')
          .order('date', { ascending: false })
      ])

      if (imagesResult.error) {
        console.error('Error loading images:', imagesResult.error.message)
        setError('Error al cargar las imágenes. Por favor, intenta de nuevo.')
        return
      }

      if (eventsResult.error) {
        console.error('Error loading events:', eventsResult.error.message)
      }

      // Filtrar imágenes válidas
      const validImages = (imagesResult.data || []).filter(image => 
        image.id && 
        image.image_url && 
        typeof image.image_url === 'string'
      )

      setImages(validImages)
      setEvents(eventsResult.data || [])
    } catch (error) {
      console.error('Error loading data:', error instanceof Error ? error.message : 'Unknown error')
      setError('Error al cargar los datos. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const getEventForImage = (eventId: number | null): Event | null => {
    if (!eventId) return null
    return events.find(event => event.id === eventId) || null
  }

  const processZipFile = async (file: File) => {
    try {
      const zip = new JSZip()
      const zipContent = await zip.loadAsync(file)
      
      const imageFiles = Object.values(zipContent.files).filter((file): file is JSZip.JSZipObject => 
        !file.dir && file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null
      )

      if (imageFiles.length === 0) {
        throw new Error('No se encontraron imágenes en el archivo ZIP')
      }

      setUploadProgress(0)
      const totalFiles = imageFiles.length
      let processedFiles = 0

      for (const imageFile of imageFiles) {
        console.log('Procesando imagen:', imageFile.name)
        const imageData = await imageFile.async('blob')
        const imageBlob = new Blob([imageData], { type: 'image/jpeg' })
        const fileName = imageFile.name.split('/').pop() || `image-${Date.now()}.jpg`
        
        const imageUrl = await uploadImageToStorage(imageBlob, fileName, true)
        
        const { error: insertError } = await supabase
          .from('gallery')
          .insert([{
            title: fileName.split('.')[0],
            image_url: imageUrl,
            alt_text: fileName.split('.')[0]
          }])

        if (insertError) {
          console.error('Error inserting image:', insertError)
          continue
        }

        processedFiles++
        setUploadProgress((processedFiles / totalFiles) * 100)
      }

      await loadData()
    } catch (error) {
      console.error('Error processing ZIP:', error)
      setError('Error al procesar el archivo ZIP. Por favor, intenta de nuevo.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const uploadImageToStorage = async (file: Blob, fileName: string, skipDbInsert: boolean = false): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (skipDbInsert) {
        formData.append('skipDbInsert', 'true')
      }
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al subir la imagen')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.zip')) {
      setError('Por favor, selecciona un archivo ZIP válido')
      return
    }

    setIsUploading(true)
    setError(null)
    await processZipFile(file)
  }

  const handleDeleteImage = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) return

    try {
      setError(null)
      const { error: deleteError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Error deleting from database:', deleteError)
        setError('Error al eliminar la imagen de la base de datos.')
        return
      }

      await loadData()
    } catch (error) {
      console.error('Error deleting image:', error)
      setError('Error al eliminar la imagen. Por favor, intenta de nuevo.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Galería de Imágenes</h1>
        <div className="flex gap-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept=".zip"
              onChange={handleZipUpload}
              className="hidden"
              disabled={isUploading}
            />
            <div className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span className="ml-2">Subir ZIP</span>
            </div>
          </label>
          <Link
            href="/admin/gallery/new"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span className="ml-2">Nueva Imagen</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {isUploading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {images.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No hay imágenes en la galería. Añade tu primera imagen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => {
            const associatedEvent = getEventForImage(image.event_id)
            return (
              <div key={image.id} className="relative group bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || image.title || "Gallery image"}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold truncate text-gray-900">
                    {image.title || "Sin título"}
                  </h3>
                  
                  {associatedEvent ? (
                    <div className="mt-2 p-2 bg-green-50 rounded-md border border-green-200">
                      <div className="flex items-center gap-1 text-green-700">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs font-medium">{associatedEvent.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 mt-1">
                        <span className="text-xs">
                          {new Date(associatedEvent.date).toLocaleDateString("es-ES")}
                        </span>
                        {associatedEvent.location && (
                          <>
                            <MapPin className="h-3 w-3 ml-1" />
                            <span className="text-xs">{associatedEvent.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-yellow-50 rounded-md border border-yellow-200">
                      <span className="text-xs text-yellow-700">Sin asignar a evento</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    ID: {image.id}
                  </p>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/gallery/${image.id}`}
                      className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
