import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="bg-black text-white font-sans">
      {/* HERO / Header */}
      <section className="py-20 px-6 text-center border-b border-red-600">
        <h1 className="text-5xl font-extrabold uppercase mb-4 tracking-wide text-red-600">Quiénes Somos</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </section>

      {/* NUESTRA HISTORIA */}
      <section className="grid md:grid-cols-2 gap-12 px-6 py-20 max-w-6xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Nuestros Inicios</h2>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">La Evolución</h2>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
      </section>


      {/* VALORES Y MISIÓN */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Nuestra Esencia</h2>
        <div className="grid md:grid-cols-2 gap-8 text-center">
          {[
            { icon: "🔥", title: "¿Que nos distingue?", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
            { icon: "🎶", title: "Ritmo", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
          ].map((val, i) => (
            <div key={i} className="p-6 border border-red-600 rounded-xl bg-black hover:bg-zinc-800 transition">
              <div className="text-5xl mb-4">{val.icon}</div>
              <h3 className="font-bold text-xl text-red-600 mb-2">{val.title}</h3>
              <p className="text-gray-300">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPO */}
      <section className="bg-black text-white py-20 px-6 border-t border-red-600">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">El Corazón de Gare7e</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Leonardo Olivera", role: "Fundador", image: "/placeholder.svg" },
            { name: "Candela", role: "Fundadora", image: "/placeholder.svg" },
            { name: "DJ Gare7e", role: "DJ", image: "/placeholder.svg" },
          ].map((member, i) => (
            <Card key={i} className="bg-zinc-900 text-white overflow-hidden border border-zinc-700 hover:border-red-600 transition-all">
              <div className="relative aspect-square">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-red-500">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FINAL / MANIFIESTO */}
      <section className="text-center py-24 px-6 bg-red-600 text-white">
        <h2 className="text-4xl font-bold uppercase mb-4">Esto es Gare7e</h2>
        <p className="max-w-2xl mx-auto text-lg">
          La cuna del reggaetón viejo.
        </p>
      </section>
    </div>
  );
}
