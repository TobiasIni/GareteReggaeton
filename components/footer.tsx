import Link from "next/link"
import { Instagram, Facebook, Twitter, Music, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="footer-glass text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Gare7e
            </h3>
            <p className="text-gray-400 mb-4">La mejor fiesta de reggaeton viejo. Revive los clásicos del perreo.</p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://open.spotify.com" className="text-gray-400 hover:text-primary transition-colors">
                <Music size={20} />
                <span className="sr-only">Spotify</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="text-gray-400 hover:text-primary transition-colors">
                  Quienes Somos
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-400 hover:text-primary transition-colors">
                  Próximos Eventos
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-gray-400 hover:text-primary transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Calle Principal 123, Ciudad</span>
              </div>
              <div className="flex items-start">
                <Mail size={20} className="text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@gare7e.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gare7e. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
