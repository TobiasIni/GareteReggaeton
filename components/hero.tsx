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
          <Button
  asChild
  size="lg"
  className="w-full bg-red-600 text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:text-red-600 hover:border hover:border-red-600 transition-all duration-300"
>
  <Link href="/eventos">
    <CalendarIcon className="w-5 h-5" />
    Próximos Eventos
  </Link>
</Button>

<Button
  asChild
  size="lg"
  className="w-full bg-black text-white font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300"
>
  <Link href="/galeria">
    <ImageIcon className="w-5 h-5" />
    Ver Galería
  </Link>
</Button>
          </div>
        </div>
      </div>
    </div>
  );
}