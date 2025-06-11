import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ImageIcon } from "lucide-react";

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline // Important for autoplay on mobile devices
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>

      {/* Capa de superposición para el gradiente/oscurecimiento */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" /> {/* Ajusta la opacidad aquí (ej: bg-opacity-50) */}
      {/* Puedes mantener tu 'hero-gradient' si también lo quieres por encima del video */}


      {/* Contenido principal (texto y botones) */}
      <div className="container relative z-30 mx-auto flex h-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <img src="/logoGarete.png" alt="Garete" className="w-1/2 h-1/2" />
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <Link 
              href="/eventos"
              className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold text-white bg-red-600 border border-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
            >
              <CalendarIcon className="w-6 h-6 mr-3" />
              Próximos Eventos
            </Link>

            <Link 
              href="/galeria"
              className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold text-white bg-black border border-red rounded-full shadow-lg hover:bg-zinc-900 transition-all duration-300"
            >
              <ImageIcon className="w-6 h-6 mr-3" />
              Ver Galería
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}