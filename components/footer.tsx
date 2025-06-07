import Link from "next/link"
import { Instagram, Facebook, Twitter, Music, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-red-600 shadow-inner shadow-red-800/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-20">

          {/* Marca */}
          <div>
            <h3 className="text-3xl font-extrabold mb-4 tracking-wider text-red-600">Gare7e</h3>
            <p className="text-gray-400 mb-4">
              Nos gusta el reggaetón viejo.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://instagram.com" className="hover:text-red-500 transition">
                <Instagram size={22} />
              </Link>
              <Link href="https://facebook.com" className="hover:text-red-500 transition">
                <Facebook size={22} />
              </Link>
              <Link href="https://twitter.com" className="hover:text-red-500 transition">
                <Twitter size={22} />
              </Link>
              <Link href="https://open.spotify.com" className="hover:text-red-500 transition">
                <Music size={22} />
              </Link>
            </div>
          </div>


          {/* Contacto */}
          <div>
            <h3 className="text-xl font-semibold text-red-500 mb-4 uppercase tracking-wide">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="text-red-600 mr-3 mt-1" />
                <span className="text-gray-400">Capital Federal, Argentina</span>
              </div>
              <div className="flex items-start">
                <Mail size={20} className="text-red-600 mr-3 mt-1" />
                <span className="text-gray-400">info@gare7e.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Gare7e. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
