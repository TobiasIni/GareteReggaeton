import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Quienes Somos</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conoce la historia detrás de Gare7e, la fiesta de reggaeton viejo que está revolucionando la noche.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <p className="mb-4">
            Gare7e nació en 2018 como un pequeño evento entre amigos que compartían la pasión por el reggaeton de la
            época dorada. Lo que comenzó como una reunión nostálgica se convirtió rápidamente en un fenómeno que atraía
            a cientos de personas cada mes.
          </p>
          <p className="mb-4">
            Nuestro objetivo es simple: revivir los clásicos del perreo que marcaron una generación. Desde Daddy Yankee
            hasta Don Omar, pasando por Wisin & Yandel y Tego Calderón, en Gare7e celebramos la música que nos hizo
            bailar en los 2000.
          </p>
          <p>
            Hoy, Gare7e es sinónimo de nostalgia, buena música y mejor ambiente. Nuestras fiestas son un viaje en el
            tiempo donde el reggaeton viejo vuelve a ser protagonista.
          </p>
        </div>
        <div className="relative aspect-video md:aspect-square">
          <Image
            src="/placeholder.svg?height=600&width=600"
            alt="Fiesta Gare7e"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Carlos Rodríguez", role: "Fundador & DJ", image: "/placeholder.svg?height=300&width=300" },
            { name: "Laura Gómez", role: "Directora de Eventos", image: "/placeholder.svg?height=300&width=300" },
            { name: "Miguel Ángel", role: "DJ Residente", image: "/placeholder.svg?height=300&width=300" },
            { name: "Ana Martínez", role: "Relaciones Públicas", image: "/placeholder.svg?height=300&width=300" },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="text-center p-4">
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          En Gare7e, nuestra misión es mantener viva la esencia del reggaeton viejo, creando espacios donde la nostalgia
          y la diversión se unen para ofrecer experiencias únicas.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: "Nostalgia", description: "Revivir los éxitos que marcaron una generación" },
            {
              title: "Comunidad",
              description: "Crear un espacio donde los amantes del reggaeton viejo puedan conectar",
            },
            { title: "Experiencia", description: "Ofrecer fiestas inolvidables con la mejor selección musical" },
          ].map((item, index) => (
            <div key={index} className="p-6 border rounded-lg">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
