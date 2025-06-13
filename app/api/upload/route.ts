import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    console.log(123)
    const formData = await request.formData()
    const file = formData.get('file') as File
    const skipDbInsert = formData.get('skipDbInsert') === 'true'
    
    console.log('Archivo recibido:', file)
    console.log('Skip DB Insert:', skipDbInsert)
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    console.log('Tipo de archivo:', file.type, 'Tamaño:', file.size, 'Nombre:', file.name);

    // Si es un archivo ZIP, extraer y mostrar los archivos
    if (file.type === 'application/zip' || file.name?.endsWith('.zip')) {
      try {
        const JSZip = (await import('jszip')).default
        const arrayBuffer = await file.arrayBuffer()
        const zip = await JSZip.loadAsync(arrayBuffer)
        
        console.log('--- ARCHIVOS EN EL ZIP ---')
        const fileList: string[] = []
        zip.forEach((relativePath, zipEntry) => {
          console.log(`📁 ${relativePath} (${zipEntry.dir ? 'carpeta' : 'archivo'})`)
          fileList.push(relativePath)
        })
        console.log('--- TOTAL DE ARCHIVOS ---', fileList.length)
        
        return NextResponse.json({ 
          message: 'ZIP procesado exitosamente',
          files: fileList,
          totalFiles: fileList.length
        })
      } catch (zipError) {
        console.error('Error procesando ZIP:', zipError)
        return NextResponse.json(
          { error: 'Error al procesar el archivo ZIP' },
          { status: 500 }
        )
      }
    }

    // Verificar el tipo de archivo (solo para imágenes)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen o un ZIP' },
        { status: 400 }
      )
    }

    // Usar siempre el cliente de servidor para evitar problemas de RLS
    const supabase = createServerSupabaseClient()
    
    // Subida de imagen
    const fileName = `image-${Date.now()}.${file.type.split('/')[1]}`
    const filePath = `gallery/${fileName}`

    // Convertir el Blob a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Intentar subir el archivo
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('test')
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: true,
        cacheControl: '3600'
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return NextResponse.json(
        { error: `Error al subir el archivo: ${uploadError.message}` },
        { status: 500 }
      )
    }

    if (!uploadData) {
      return NextResponse.json(
        { error: 'No se recibió confirmación de la subida del archivo' },
        { status: 500 }
      )
    }

    // Obtener la URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('test')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      return NextResponse.json(
        { error: 'No se pudo obtener la URL pública del archivo' },
        { status: 500 }
      )
    }

    // Solo insertar en la base de datos si no se especifica que se salte
    if (!skipDbInsert) {
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([{ image_url: publicUrl, title: 'Mi imagen', alt_text: 'Descripción' }])

      if (insertError) {
        console.error('Error inserting row:', insertError)
        return NextResponse.json(
          { error: `Error al insertar en la base de datos: ${insertError.message}` },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Error in upload route:', error)
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
