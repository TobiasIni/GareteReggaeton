"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { ContactForm } from "@/components/contact-form"; // Assuming this component exists

interface FAQItemProps {
  question: string;
  answer: string;
}

// Componente para una pregunta frecuente individual
const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 pb-4">
      <button
        className="flex justify-between items-center w-full py-3 text-lg font-semibold text-white hover:text-red-400 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <p className="pt-2 pb-3 text-gray-300 leading-relaxed animate-fade-in">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function ContactPage() {
  const faqs = [
    {
      question: "¿Cuáles son los horarios de atención?",
      answer: "Nuestro equipo está disponible de Lunes a Viernes de 10:00 a 18:00 y Sábados de 12:00 a 16:00. Los Domingos cerramos para recargar energías."
    },
    {
      question: "¿Dónde puedo encontrar las entradas para los eventos?",
      answer: "Las entradas para nuestros eventos están disponibles a través de nuestra página web en la sección de 'Eventos' o en plataformas de venta de tickets asociadas, que anunciaremos con cada evento."
    },
    {
      question: "¿Ofrecen servicios para eventos privados?",
      answer: "¡Absolutamente! Ofrecemos servicios personalizados para eventos privados, desde fiestas corporativas hasta celebraciones personales. Contactanos a través del formulario o email para más detalles."
    },
    {
      question: "¿Cómo puedo enviar demos o propuestas musicales?",
      answer: "Si sos un DJ o artista y querés compartir tu música con nosotros, envianos tus demos o propuestas a nuestro email de eventos: eventos@gare7e.com. ¡Nos encanta descubrir nuevos talentos!"
    },
    {
      question: "¿Hay estacionamiento disponible en sus eventos?",
      answer: "La disponibilidad de estacionamiento varía según la ubicación del evento. Te recomendamos consultar la información específica de cada evento en nuestra sección de 'Eventos' para detalles sobre estacionamiento y transporte público."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-900 via-black to-gray-950 text-white font-sans">
      <div className="container mx-auto px-4 py-16">
        {/* Encabezado Principal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-red-500 leading-tight">
            Contactate con nosotros <span className="font-black italic"></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto tracking-wide">
            Sos Dj o artista y querés contactarnos?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Información de Contacto */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-400 border-b-2 border-red-500 pb-2 inline-block">
              Información Esencial
            </h2>

            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin size={28} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">Nuestra Base</h3>
                  <p className="text-gray-300">
                    Calle Principal 123, <br />
                    Capital Federal, C.A.B.A., Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail size={28} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">Email Directo</h3>
                  <p className="text-gray-300">
                    <a href="mailto:info@gare7e.com" className="hover:text-red-400 transition-colors">info@gare7e.com</a>
                    <br />
                    <a href="mailto:eventos@gare7e.com" className="hover:text-red-400 transition-colors">eventos@gare7e.com</a> (para propuestas y demos)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone size={28} className="text-red-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-1 text-white">Llamanos</h3>
                  <p className="text-gray-300">
                    <a href="tel:+34912345678" className="hover:text-red-400 transition-colors">+34 912 345 678</a>
                    <br />
                    <a href="tel:+34666777888" className="hover:text-red-400 transition-colors">+34 666 777 888</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Horarios de Atención */}
            <div className="mt-12 p-6 bg-transparent-800 rounded-lg shadow-xl border border-transparent">
              <h2 className="text-2xl font-bold mb-6 text-red-400">Horarios de atención</h2>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="font-semibold">Lunes - Viernes:</span>
                  <span className="text-red-300">10:00 - 18:00 HS</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="font-semibold">Sábado:</span>
                  <span className="text-red-300">12:00 - 16:00 HS</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="font-semibold">Domingo:</span>
                  <span className="text-red-300">Cerrado (¡Preparando la próxima!)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-400 border-b-2 border-red-500 pb-2 inline-block">
              Dejanos tu Mensaje
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <div className="mt-24">
          <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-red-500 drop-shadow-lg">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Sección de Ubicación de la Próxima Fiesta (sin widget de Google Maps) */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-extrabold mb-8 bg-clip-text text-red-500 drop-shadow-lg">
            ¿Dónde es la Próxima Fiesta?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Encontra nuestras proximas fiestas en la seccion de <strong className="text-red-400">'Proximos Eventos'</strong> de nuestra web o en nuestras redes sociales. <strong className="text-red-400"> ¡Prepárate para irte al Gare7e! </strong>
          </p>
        </div>
      </div>
    </div>
  );
}