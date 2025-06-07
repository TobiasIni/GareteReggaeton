import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section: Quiénes Somos - Enfoque Impactante */}
      <div className="relative h-[500px] w-full mb-20 overflow-hidden rounded-xl shadow-2xl">
        <Image
          src="/logoGarete.png?height=1000&width=1600" // Considera una imagen de fondo más abstracta o energética
          alt="Gare7e"
          fill
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up">
            Reggaeton del Bueno
          </h1>
          <p className="text-xl max-w-3xl animate-fade-in-up delay-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </div>

      {/* Sección: Nuestra Esencia - Timeline Interactiva */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestra Evolución</h2>
        <div className="relative border-l-2 border-gray-700 ml-4 md:ml-12">
          {/* Hito 1 */}
          <div className="mb-10 ml-8 relative before:content-[''] before:absolute before:-left-10 before:top-2 before:w-5 before:h-5 before:rounded-full before:bg-red-500 before:border-4 before:border-gray-800">
            <h3 className="text-2xl font-semibold mb-2 text-white">2025: Nuestra primera fiesta</h3>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
          </div>
          {/* Hito 2 */}
          <div className="mb-10 ml-8 relative before:content-[''] before:absolute before:-left-10 before:top-2 before:w-5 before:h-5 before:rounded-full before:bg-red-500 before:border-4 before:border-gray-800">
            <h3 className="text-2xl font-semibold mb-2 text-white">Crecimiento Explosivo: La Fusión de Generaciones</h3>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
          </div>
          {/* Hito 3 */}
          <div className="mb-10 ml-8 relative before:content-[''] before:absolute before:-left-10 before:top-2 before:w-5 before:h-5 before:rounded-full before:bg-red-500 before:border-4 before:border-gray-800">
            <h3 className="text-2xl font-semibold mb-2 text-white">Hoy: Más que una Fiesta, una Comunidad</h3>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
          </div>
        </div>
      </div>

      {/* Sección: Mentes Detrás del Ritmo - Diseño de Cards Flotantes */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Nosotros</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {[
            { name: "Leonardo", role: "Fundador", image: "/placeholder.svg?height=300&width=300" },
            { name: "Candela ", role: "Fundadora", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-800 to-black text-white border-none">
              <div className="aspect-square relative group">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-center font-bold text-lg">{member.role}</p>
                </div>
              </div>
              <CardContent className="text-center p-4">
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{member.role.split(' ')[0]} {member.role.split(' ')[1]}</p> {/* Para mostrar solo el rol primario en la tarjeta */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sección: Nuestro Manifiesto - Iconos y Mensajes Clave */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Nuestro Manifiesto</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {[
            { title: "Nuestro estilo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.", icon: "🎵" }, // Puedes reemplazar con iconos de tu librería (ej. lucide-react)
            { title: "Nuestra comunidad", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.", icon: "🤝" },
          ].map((item, index) => (
            <div key={index} className="p-8 border border-gray-700 rounded-xl shadow-lg bg-gray-900 transition-all duration-300 hover:border-red-500 hover:shadow-red-500/30">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-2xl mb-3 text-white">{item.title}</h3>
              <p className="text-base text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}