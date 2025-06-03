import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 opacity-60" />
      <div className="container relative z-10 mx-auto px-4 py-32 text-center sm:px-6 lg:px-8">
        <h1 className="font-montserrat text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block"></span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-xl text-gray-300">
          
        </p>
        <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <Button asChild size="lg" className="w-full">
              <Link href="/eventos">Próximos Eventos</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/galeria">Ver Galería</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
